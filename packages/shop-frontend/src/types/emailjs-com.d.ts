declare module "emailjs-com" {
    export function send(
      serviceID: string,
      templateID: string,
      templateParams: Record<string, any>,
      userID: string
    ): Promise<void>;
  
    export function sendForm(
      serviceID: string,
      templateID: string,
      form: HTMLFormElement,
      userID: string
    ): Promise<void>;
  
    export function init(userID: string): void;
  }
  