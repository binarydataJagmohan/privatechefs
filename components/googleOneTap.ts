type GoogleOneTapOptions = {
  client_id: string;
  auto_select?: boolean;
  cancel_on_tap_outside?: boolean;
  context?: 'signin' | 'signup' | 'use';
  [key: string]: any;
};

type CredentialResponse = {
  credential: string;
  select_by: string;
};

export function googleOneTap(
  {
    client_id,
    auto_select = false,
    cancel_on_tap_outside = false,
    context = 'signin',
    ...otherOptions
  }: GoogleOneTapOptions,
  callback: (response: CredentialResponse) => void
): void {
  if (!client_id) {
    throw new Error('client_id is required');
  }

  if (typeof window !== 'undefined' && typeof document !== 'undefined') {
    const contextValue: 'signin' | 'signup' | 'use' =
      ['signin', 'signup', 'use'].includes(context) ? context : 'signin';

    const googleScript = document.createElement('script');
    googleScript.src = 'https://accounts.google.com/gsi/client';
    googleScript.async = true;
    googleScript.defer = true;
    document.head.appendChild(googleScript);

    googleScript.onload = () => {
      if (window.google && window.google.accounts) {
        // Initialize Google One Tap
        window.google.accounts.id.initialize({
          client_id,
          callback,
          auto_select: false,
          cancel_on_tap_outside,
          context: contextValue,
          itp_support: true,
          ...otherOptions,
        });

        // Check if the user is already authenticated
        if (!localStorage.getItem('token')) {  
          // Prompt for Google One Tap login if user is not authenticated
          window.google.accounts.id.prompt();
        } else {
          console.log('User already authenticated, skipping One Tap prompt..');
        }
      }
    };
  }
}
