import { SITE } from '@/consts'
import { Resvg } from '@resvg/resvg-js'
import type { APIContext } from 'astro'
import { getCollection } from 'astro:content'
import fs from 'fs'
import path from 'path'
import satori from 'satori'
import { html } from 'satori-html'

const MontserratRegular = fs.readFileSync(
  path.resolve('./public/fonts/_montserrat_regular.ttf'),
)
const MontserratBold = fs.readFileSync(
  path.resolve('./public/fonts/_montserrat_bold.ttf'),
)

const dimensions = { width: 1200, height: 630 }

/** Static mirror of the site tokens — satori cannot read CSS variables. */
const palette = {
  ink: '#141619',
  inkDeep: '#0F1113',
  text: '#ECEEF1',
  muted: '#8E959F',
  accent: '#C9F24D',
  line: 'rgba(255, 255, 255, 0.12)',
}

interface Props {
  title: string
  date: Date
  description: string
  tags: string[]
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function truncate(value: string, max: number): string {
  return value.length > max ? `${value.slice(0, max - 1).trimEnd()}…` : value
}

export async function GET(context: APIContext) {
  const { title, date, description, tags } = context.props as Props

  const formattedDate = new Intl.DateTimeFormat('fr-FR', {
    year: 'numeric',
    month: 'long',
  }).format(date)

  const tagElements = tags
    .slice(0, 4)
    .map(
      (tag) =>
        `<div style="display: flex; background: rgba(201, 242, 77, 0.1); border: 1px solid rgba(201, 242, 77, 0.3); color: ${palette.accent}; font-size: 15px; padding: 7px 16px; border-radius: 999px; margin-right: 10px;">${escapeHtml(tag)}</div>`,
    )
    .join('')

  const markup = html(
    `<div style="display: flex; flex-direction: column; width: 100%; height: 100%; background: ${palette.ink}; color: ${palette.text}; position: relative;">
      <div style="position: absolute; display: flex; width: 620px; height: 620px; top: -280px; right: -180px; border-radius: 50%; background: radial-gradient(circle, rgba(201, 242, 77, 0.16) 0%, rgba(20, 22, 25, 0) 70%);"></div>
      <div style="position: absolute; display: flex; width: 520px; height: 520px; bottom: -260px; left: -160px; border-radius: 50%; background: radial-gradient(circle, rgba(123, 108, 255, 0.18) 0%, rgba(20, 22, 25, 0) 70%);"></div>

      <div style="display: flex; flex: 1; flex-direction: column; justify-content: center; padding: 64px 70px;">
        <div style="display: flex; align-items: center; font-size: 16px; color: ${palette.muted}; letter-spacing: 3px; text-transform: uppercase;">
          <div style="display: flex; width: 34px; height: 3px; background: ${palette.accent}; margin-right: 16px;"></div>
          ${escapeHtml(formattedDate)}
        </div>

        <div style="display: flex; font-size: 62px; font-weight: 700; line-height: 1.1; margin-top: 26px; letter-spacing: -1.5px; width: 92%;">
          ${escapeHtml(truncate(title, 72))}
        </div>

        <div style="display: flex; font-size: 22px; color: ${palette.muted}; line-height: 1.5; margin-top: 22px; width: 82%;">
          ${escapeHtml(truncate(description, 150))}
        </div>

        <div style="display: flex; margin-top: 32px;">
          ${tagElements}
        </div>
      </div>

      <div style="display: flex; align-items: center; justify-content: space-between; padding: 28px 70px; border-top: 1px solid ${palette.line}; background: ${palette.inkDeep};">
        <div style="display: flex; align-items: center;">
          <div style="display: flex; align-items: center; justify-content: center; width: 46px; height: 46px; border-radius: 12px; background: ${palette.accent}; color: ${palette.inkDeep}; font-size: 20px; font-weight: 700;">MA</div>
          <div style="display: flex; flex-direction: column; margin-left: 18px;">
            <div style="display: flex; font-size: 20px; font-weight: 700;">${escapeHtml(SITE.author)}</div>
            <div style="display: flex; font-size: 15px; color: ${palette.muted};">${escapeHtml(SITE.role)}</div>
          </div>
        </div>
        <div style="display: flex; font-size: 16px; color: ${palette.muted};">${escapeHtml(SITE.href.replace(/^https?:\/\//, ''))}</div>
      </div>
    </div>`,
  ) as unknown as React.ReactNode

  const svg = await satori(markup, {
    fonts: [
      {
        name: 'Montserrat',
        data: MontserratRegular,
        weight: 400,
        style: 'normal',
      },
      { name: 'Montserrat', data: MontserratBold, weight: 700, style: 'normal' },
    ],
    height: dimensions.height,
    width: dimensions.width,
  })

  const image = new Resvg(svg, {
    fitTo: { mode: 'width', value: dimensions.width },
    font: {
      fontFiles: [
        MontserratRegular.toString('base64'),
        MontserratBold.toString('base64'),
      ],
      loadSystemFonts: true,
      defaultFontFamily: 'Montserrat',
    },
    logLevel: 'error',
  }).render()

  const pngData = image.asPng()

  return new Response(pngData, {
    headers: {
      'Content-Type': 'image/png',
      'Cache-Control': 'public, max-age=31536000, immutable',
      'Content-Length': pngData.length.toString(),
    },
  })
}

export async function getStaticPaths() {
  const projects = await getCollection('projects')
  return projects.map((project) => ({
    params: { id: project.id },
    props: {
      title: project.data.name,
      date: project.data.startDate ?? new Date(),
      description: project.data.description,
      tags: project.data.tags ?? [],
    },
  }))
}
