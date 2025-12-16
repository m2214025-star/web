export class Patient {
    id: number;
    fullName: string;
    birthDate: string; // можно использовать Date, но для простоты - string
    phone: string;
    doctorId: number;  // связь с врачом
}