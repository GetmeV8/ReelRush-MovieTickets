import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { useEffect, useState } from 'react';


export default function ScrollableTabsButtonAuto(props) {

    const [date, setDates] = useState([])

    const [show, setShow] = useState([])


    const [value, setValue] = useState(0);

    useEffect(() => {
        setShow(props.data)
    }, [props])

    useEffect(() => {

        const startDate = new Date();
        const duplicateDate = new Date();
        const expiryDate = new Date(duplicateDate.setDate(duplicateDate.getDate() + 10));

        for (let Showdate = startDate; Showdate < expiryDate; Showdate.setDate(Showdate.getDate() + 1)) {
            date.push(new Intl.DateTimeFormat('en-Uk', { year: 'numeric', month: '2-digit', day: '2-digit' }).format(Showdate));
        }
    }, [date])
    const handleChange = (event, newValue) => {
        setValue(newValue);
        const dateStr = event.target.innerText;
        const [day, month, year] = dateStr.split('/');
        const date = new Date(year, month - 1, day);
        props.fn(date)

    };
    return (
        <div className='bg-[#ffeded]'>
            <Box sx={{ maxWidth: { xs: 320, sm: 480 } }}>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    variant="scrollable"
                    scrollButtons="auto"
                    aria-label="scrollable auto tabs example"
                    indicatorColor='secondary'
                >
                    {date.map((dat, index) => <Tab label={dat} key={index} />)}
                </Tabs>
            </Box>
        </div>
    );
}