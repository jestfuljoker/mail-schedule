export interface SendEmailResponse {
	accepted: string[];
	rejected: string[];
	ehlo: string[];
	envelopeTime: number;
	messageTime: number;
	messageSize: number;
	response: string;
	envelope: Envelope;
	messageId: string;
}

export interface Envelope {
	from: string;
	to: string[];
}
