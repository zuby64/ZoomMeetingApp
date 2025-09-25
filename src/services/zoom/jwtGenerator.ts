import { KJUR } from 'jsrsasign';

// Zoom Meeting SDK credentials
const ZOOM_MEETING_SDK_KEY = 'PTEXFnRWRMinKQm6M1lLvg';
const ZOOM_MEETING_SDK_SECRET = 'gfAJLs6vWV49k1JWNIrnsF52GuiHXbFD';

/**
 * Generate JWT token for Zoom Meeting SDK
 * Based on official Zoom Meeting SDK documentation
 */
export const generateJwt = (meetingNumber?: string, role: number = 0): string => {
  try {
    console.log('Generating JWT token for Zoom Meeting SDK...');
    console.log('SDK Key:', ZOOM_MEETING_SDK_KEY);
    console.log('Meeting Number:', meetingNumber || 'Not provided');
    console.log('Role:', role);

    // Current time in seconds
    const iat = Math.floor(Date.now() / 1000) - 30;
    const exp = iat + 60 * 60 * 2; // 2 hours from now

    // JWT Header
    const oHeader = {
      alg: 'HS256',
      typ: 'JWT'
    };

    // JWT Payload - following official Zoom Meeting SDK documentation
    const oPayload = {
      iss: ZOOM_MEETING_SDK_KEY, // Issuer (SDK Key)
      exp: exp, // Expiration time
      iat: iat, // Issued at
      aud: 'zoom', // Audience
      appKey: ZOOM_MEETING_SDK_KEY, // App Key (same as SDK Key)
      tokenExp: exp, // Token expiration
      ...(meetingNumber && { mn: meetingNumber }), // Meeting number (optional)
      ...(role !== undefined && { role: role }), // Role (0 = attendee, 1 = host)
    };

    console.log('JWT Header:', oHeader);
    console.log('JWT Payload:', oPayload);

    // Generate JWT token
    const sHeader = JSON.stringify(oHeader);
    const sPayload = JSON.stringify(oPayload);
    const sJWT = KJUR.jws.JWS.sign('HS256', sHeader, sPayload, ZOOM_MEETING_SDK_SECRET);

    console.log('Generated JWT token successfully');
    console.log('JWT Token (first 50 chars):', sJWT.substring(0, 50) + '...');

    return sJWT;
  } catch (error) {
    console.error('Failed to generate JWT token:', error);
    throw new Error(`JWT generation failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};

/**
 * Generate JWT token for joining a specific meeting
 */
export const generateMeetingJWT = (meetingNumber: string, role: number = 0): string => {
  return generateJwt(meetingNumber, role);
};

/**
 * Generate JWT token for SDK initialization (no specific meeting)
 */
export const generateSDKJWT = (): string => {
  return generateJwt();
};
