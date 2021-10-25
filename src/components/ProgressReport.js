import React, {useEffect, useState} from 'react';
import {FormControl, Select, MenuItem, InputLabel} from "@mui/material";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import BatteryFullIcon from '@mui/icons-material/BatteryFull';
import BatteryCharging50Icon from '@mui/icons-material/BatteryCharging50';
import CircularProgress from '@mui/material/CircularProgress';
import './ProgressReport.css';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';


export default function ProgressReport() {
    const [data, setData] = useState([]);
    const [myClass, setClass] = useState(14);

    useEffect(async () => {
        const result = await bob(myClass);
        setData(result);
    }, [])

    const handleChange = async (e) => {
        setClass(e.target.value);
        const result = await bob(e.target.value);
        setData(result);
    };

    return (
        <>
            <h1>Progress Report</h1>
            <div id='select'>
                <FormControl>
                    <InputLabel id="demo-simple-select-label">Class</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="Age"
                        value={myClass}
                        onChange={handleChange}
                    >
                        <MenuItem value={14}>중등반</MenuItem>
                        <MenuItem value={16}>고등반</MenuItem>

                    </Select>
                </FormControl>
            </div>
            <TableContainer component={Paper}>
                <Table sx={{maxWidth: 900, margin: 'auto'}} size="small" aria-label="a dense table">
                    <TableHead sx={{backgroundColor: "#444"}}>
                        <TableRow sx={{color: "white"}}>
                            {/*<TableCell sx={{color: "white"}}>name</TableCell>*/}
                            {/*<TableCell sx={{color: "white"}}><BatteryFullIcon/></TableCell>*/}
                            {/*<TableCell sx={{color: "white"}}><BatteryCharging50Icon/></TableCell>*/}
                            {/*<TableCell sx={{color: "white"}}>Avg Rep</TableCell>*/}
                            {/*<TableCell sx={{color: "white"}}>Word Score</TableCell>*/}
                            {/*<TableCell sx={{color: "white"}}>구구단</TableCell>*/}
                            <TableCell sx={{color: "white"}}>name</TableCell>
                            <TableCell sx={{color: "white"}}>Avg Test Score</TableCell>
                            <TableCell sx={{color: "white"}}>구구단</TableCell>
                            <TableCell sx={{color: "white"}}>Word Score</TableCell>
                            <TableCell sx={{color: "white"}}>activity</TableCell>
                            <TableCell sx={{color: "white"}}>TOTAL</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map(item => {
                            item.MathPerc = item.MathPerc > 100 ? 100 : item.MathPerc;
                            item.avgRepnum = Math.round(item.avgRepnum * 100) / 100;
                            return (

                                // <TableRow sx={{'&:last-child td, &:last-child th': {border: 0}}} key={item.id}>
                                //     <TableCell sx={{fontWeight: 800}}>{item.name}</TableCell>
                                //     <TableCell>{item.numLearned}</TableCell>
                                //     <TableCell>{item.numLearning}</TableCell>
                                //     <TableCell>{item.avgRepnum > 0 ? item.avgRepnum : ''}</TableCell>
                                //     <TableCell>{item.wordscore}</TableCell>
                                //     <TableCell>
                                //         <Box sx={{position: 'relative', display: 'inline-flex'}}>
                                //             <CircularProgress color='success' variant='determinate'
                                //                               value={item.MathPerc}/>
                                //             <Box sx={{
                                //                 top: 0,
                                //                 left: 0,
                                //                 bottom: 0,
                                //                 right: 0,
                                //                 position: 'absolute',
                                //                 display: 'flex',
                                //                 alignItems: 'center',
                                //                 justifyContent: 'center',
                                //                 color: 'black',
                                //                 backgroundColor: ''
                                //
                                //             }}>
                                //                 <Typography variant='caption' component='div' color='text.secondary'>
                                //                     {item.MathPerc}%
                                //                 </Typography>
                                //             </Box>
                                //         </Box>
                                //     </TableCell>
                                // </TableRow>
                                <TableRow sx={{'&:last-child td, &:last-child th': {border: 0}}} key={item.id}>
                                    <TableCell sx={{fontWeight: 800}}>{item.name}</TableCell>
                                    <TableCell>{item.avgscore}</TableCell>
                                    <TableCell>{item.math}</TableCell>
                                    <TableCell>{item.word}</TableCell>
                                    <TableCell>{item.activity > 0 ? item.activity : ''}</TableCell>
                                    <TableCell>
                                        <Box sx={{position: 'relative', display: 'inline-flex'}}>
                                            <CircularProgress color='success' variant='determinate'
                                                              value={item.total}/>
                                            <Box sx={{
                                                top: 0,
                                                left: 0,
                                                bottom: 0,
                                                right: 0,
                                                position: 'absolute',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                color: 'black',
                                                backgroundColor: ''

                                            }}>
                                                <Typography variant='caption' component='div' color='text.secondary'>
                                                    {item.total}%
                                                </Typography>
                                            </Box>
                                        </Box>
                                    </TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}


async function bob(myClass) {
    let responseObj = await fetch('showProgress.php?classid=' + myClass, {
        method: 'GET',
        headers: {
            'Content-Type': 'text/plain'
        }
    });
    let responseText = await responseObj.text();
    // console.log(responseText);
    const myArr = JSON.parse(responseText);
    //     item.numLearning = item.numLearning > 0 ? item.numLearning : 0;
    //     item.avgRepnum = item.avgRepnum > 0 ? item.avgRepnum : 0;
    //     item.wordscore = item.wordscore > 0 ? item.wordscore : 0;
    //     item.word = item.word > 0 ? item.word : 0;
    //     item.activity = item.activity > 0 ? item.activity : 0;
    // });
    myArr.map((item) => {
        console.log("treating array");
        item.numLearned = item.numLearned === null ? 0: parseInt(item.numLearned);
        item.numLearning =  item.numLearning === null ? 0: parseInt(item.numLearning);
        item.avgRepnum =  item.avgRepnum === null ? 0: parseInt(item.avgRepnum);
        item.MathPerc =  item.MathPerc === null ? 0: parseInt(item.MathPerc);
        item.wordscore =  item.wordscore === null ? 0: parseInt(item.wordscore);
        item.avgscore =  item.avgscore === null ? 0: parseInt(item.avgscore);
        item.word =  item.word === null ? 0: parseInt(item.word);
        item.math =  item.math === null ? 0: parseInt(item.math);
        item.activity =  item.activity === null ? 0: parseInt(item.activity);
        item.total =  item.total === null ? 0: parseInt(item.total);
        item.total = item.total > 0 ? item.total : Math.round((item.avgscore + item.word + item.math + item.activity) /4)
    });

    //TODO don't need to calculate total in the php file, offload this to clients.
    console.log(myArr);
    return myArr;
}
