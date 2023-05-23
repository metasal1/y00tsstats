import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_API_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

async function saveDataToTable(data) {
    // const data = [
    //     { name: 'John', age: 25 },
    //     { name: 'Jane', age: 30 }
    // ];

    try {
        const { data: insertedData, error } = await supabase
            .from('opensea')
            .insert(data);

        if (error) {
            console.error('Error inserting data:', error.message);
            return;
        }

        console.log('Data inserted successfully:', insertedData);
    } catch (error) {
        console.error('Error inserting data:', error.message);
    }
}

saveDataToTable();
