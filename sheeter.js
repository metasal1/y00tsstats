import { google } from 'googleapis';
import credentials from './credentials.json' assert { type: 'json' };
import dotenv from 'dotenv';
dotenv.config();

const spreadsheetId = process.env.SPREADSHEET_ID;
// Configure authentication
const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

// Create a new instance of Google Sheets API
const sheets = google.sheets({ version: 'v4', auth });

// Function to append data to the spreadsheet
export default async function appendDataToSheet(data) {
    try {
        const response = await sheets.spreadsheets.values.append({
            spreadsheetId,
            range: 'listings', // Replace with your sheet name or range
            valueInputOption: 'RAW',
            // valueInputOption: 'USER_ENTERED',
            resource: {
                values: [data],
            },
        });

        console.log('Data appended successfully:', response.data);
    } catch (error) {
        console.error('Error appending data:', error.message);
    }
}

// Usage example
// const dataToSave = ['John Doe', 'john.doe@example.com', 'New York'];
// appendDataToSheet(dataToSave);
