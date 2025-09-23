import {MessageOptions, showMessage} from 'react-native-flash-message';
import {FlashMessageType} from '../constant';

export const FlashMessage = (message: string, type: string, onPress?: () => void) => {
  console.log('FlashMessage called:', { message, type });
  
  const flashMessageOptions: MessageOptions = {
    message: message,
    duration: 3000,
    onPress: onPress,
  };

  switch (type) {
    case 'error':
      flashMessageOptions.type = FlashMessageType.DANGER;
      break;
    case 'warning':
      flashMessageOptions.type = FlashMessageType.WARNING;
      break;
    case 'success':
      flashMessageOptions.type = FlashMessageType.SUCCESS;
      break;
    default:
      flashMessageOptions.type = FlashMessageType.SUCCESS;
      break;
  }
  
  console.log('FlashMessage options:', flashMessageOptions);
  showMessage(flashMessageOptions);
};