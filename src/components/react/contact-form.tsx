import { useState } from 'react';

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notification, setNotification] = useState<{
    show: boolean;
    type: 'success' | 'error';
    title: string;
    message: string;
  }>({
    show: false,
    type: 'success',
    title: '',
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    
    // Validation côté client
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const message = formData.get('message') as string;

    if (!name || !email || !message) {
      showNotification('Erreur !', 'Veuillez remplir tous les champs.', 'error');
      setIsSubmitting(false);
      return;
    }

    if (!isValidEmail(email)) {
      showNotification('Erreur !', 'Veuillez entrer une adresse email valide.', 'error');
      setIsSubmitting(false);
      return;
    }

    try {
      // Utiliser Getform.io - Service gratuit et simple (jusqu'à 50 submissions/mois)
      const response = await fetch('https://getform.io/f/bqoopvvb', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name,
          email: email,
          message: message,
          subject: 'Nouveau message depuis votre portfolio',
          portfolio: 'Mekkiou Adam - Portfolio Contact'
        })
      });
      
      if (response.ok) {
        showNotification('Message envoyé !', 'Votre message a été envoyé avec succès. Je vous répondrai dans les plus brefs délais.', 'success');
        e.currentTarget.reset();
      } else {
        throw new Error('Erreur lors de l\'envoi');
      }
    } catch (error) {
      console.error('Erreur d\'envoi:', error);
      // Fallback: mailto comme dernière option
      const mailtoLink = `mailto:adam.mekkiou@outlook.fr?subject=Contact depuis votre portfolio&body=Nom: ${name}%0D%0AEmail: ${email}%0D%0A%0D%0AMessage:%0D%0A${message}`;
      window.location.href = mailtoLink;
      showNotification('Redirection...', 'Ouverture de votre client email pour envoyer le message.', 'success');
    } finally {
      setIsSubmitting(false);
    }
  };

  const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const showNotification = (title: string, message: string, type: 'success' | 'error') => {
    setNotification({
      show: true,
      type,
      title,
      message
    });

    // Masquer la notification après 5 secondes
    setTimeout(() => {
      setNotification(prev => ({ ...prev, show: false }));
    }, 5000);
  };

  return (
    <>
      <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <input type="hidden" name="to_email" value="adam.mekkiou@outlook.fr" />
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-white mb-2">
              Nom
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Votre nom"
              className="w-full px-4 py-3 bg-[#2a2a2a] border border-[#3a3a3a] rounded-lg text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-300"
              required
            />
          </div>
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-white mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="votre.email@exemple.com"
              className="w-full px-4 py-3 bg-[#2a2a2a] border border-[#3a3a3a] rounded-lg text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-300"
              required
            />
          </div>
          
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-white mb-2">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={6}
              placeholder="Décrivez votre projet ou votre demande..."
              className="w-full px-4 py-3 bg-[#2a2a2a] border border-[#3a3a3a] rounded-lg text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-300 resize-none"
              required
            />
          </div>
          
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-yellow-500 text-black py-3 px-6 rounded-lg font-medium hover:bg-yellow-600 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 focus:ring-offset-[#1a1a1a] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Envoi en cours...' : 'Envoyer'}
          </button>
        </form>
      </div>

      {/* Notification Popup */}
      {notification.show && (
        <div className="fixed top-4 right-4 z-50 animate-in slide-in-from-right duration-300">
          <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-6 shadow-2xl max-w-sm">
            <div className="flex items-center space-x-3">
              <div className="w-6 h-6 rounded-full flex items-center justify-center">
                {notification.type === 'success' ? (
                  <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                  </svg>
                ) : (
                  <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"/>
                  </svg>
                )}
              </div>
              <div>
                <h3 className="text-foreground font-semibold">{notification.title}</h3>
                <p className="text-muted-foreground text-sm">{notification.message}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
