import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
    TextField,
    Button,
    Box,
    Typography,
    Container,
    Paper,
    Grid
} from '@mui/material';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Dayjs } from 'dayjs';  // 日付の型定義

const GoalSettingPage: React.FC = () => {
    const navigate = useNavigate();
    const [goal, setGoal] = useState<string>('');
    const [amazonLink1, setAmazonLink1] = useState<string>('');
    const [money1, setMoney1] = useState<string>('');
    const [amazonLink2, setAmazonLink2] = useState<string>('');
    const [money2, setMoney2] = useState<string>('');
    const [deadline, setDeadline] = useState<Dayjs | null>(null);

    // 目標が既に設定されている場合はリダイレクト
    useEffect(() => {
        const goalStatus = localStorage.getItem('isGoalSet');
        if (goalStatus) {
            navigate('/result');
        }
    }, [navigate]);

    // フォームの送信処理
    const handleSubmit = async () => {
        const data = {
            goal,
            amazonLink1,
            money1,
            amazonLink2,
            money2,
            deadline
        };

        try {
            await axios.post('https://backend.example.com/api/goal', data);
            alert('データが送信されました');
            localStorage.setItem('isGoalSet', 'true');
            navigate('/result');
        } catch (error) {
            console.error('エラーが発生しました', error);
            alert('データ送信に失敗しました');
        }
    };

    // Amazonリンクとお金の入力フィールドを生成
    const renderAmazonFields = (person: number) => (
        <Paper elevation={2} sx={{ p: 2, mb: 2, background: '#F3F4F6' }}>
            <Typography variant="h6" gutterBottom color="secondary">
                {person}人目
            </Typography>
            <TextField
                fullWidth
                label="Amazonのリンクを入力"
                value={person === 1 ? amazonLink1 : amazonLink2}
                onChange={(e) => person === 1 ? setAmazonLink1(e.target.value) : setAmazonLink2(e.target.value)}
                variant="outlined"
                margin="normal"
            />
            <TextField
                fullWidth
                label="お金を入力"
                value={person === 1 ? money1 : money2}
                onChange={(e) => person === 1 ? setMoney1(e.target.value) : setMoney2(e.target.value)}
                type="number"
                variant="outlined"
                margin="normal"
            />
        </Paper>
    );

    return (
        <Container maxWidth="md">
            <Box my={4}>
                <Paper elevation={3} sx={{ p: 4, background: 'linear-gradient(145deg, #EEF2FF 0%, #E0E7FF 100%)' }}>
                    <Typography variant="h4" component="h1" gutterBottom align="center" color="primary">
                        目標設定
                    </Typography>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="目標"
                                value={goal}
                                onChange={(e) => setGoal(e.target.value)}
                                variant="outlined"
                            />
                        </Grid>
                        {/* Amazonリンクと金額入力フィールドを表示 */}
                        {[1, 2].map((person) => (
                            <Grid item xs={12} key={person}>
                                {renderAmazonFields(person)}
                            </Grid>
                        ))}
                        {/* 目標達成期限の選択 */}
                        <Grid item xs={12}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                    label="目標達成期限を選択"
                                    value={deadline}
                                    onChange={(newValue: Dayjs | null) => setDeadline(newValue)}
                                    slotProps={{
                                        textField: { fullWidth: true, variant: 'outlined' }
                                    }}
                                />
                            </LocalizationProvider>
                        </Grid>
                        {/* 目標設定の送信ボタン */}
                        <Grid item xs={12}>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleSubmit}
                                fullWidth
                                size="large"
                                sx={{ mt: 2 }}
                            >
                                目標達成を報告する
                            </Button>
                        </Grid>
                    </Grid>
                </Paper>
            </Box>
        </Container>
    );
}

export default GoalSettingPage;


// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import {
//     TextField,
//     Button,
//     Box,
//     Typography,
//     Container,
//     Paper,
//     Grid,
//     // Grid2
// } from '@mui/material';
// import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
// // import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { Dayjs } from 'dayjs';  // 日付の型定義

// const GoalSettingPage: React.FC = () => {
//     const navigate = useNavigate();
//     const [goal, setGoal] = useState<string>('');
//     const [amazonLink1, setAmazonLink1] = useState<string>('');
//     const [money1, setMoney1] = useState<string>('');
//     const [amazonLink2, setAmazonLink2] = useState<string>('');
//     const [money2, setMoney2] = useState<string>('');
//     const [deadline, setDeadline] = useState<Dayjs | null>(null);  // 日付型は `Dayjs | null` を使用

//     // 目標が既に設定されている場合はリダイレクト
//     useEffect(() => {
//         const goalStatus = localStorage.getItem('isGoalSet');
//         if (goalStatus) {
//             navigate('/result');  // 目標達成報告画面や別の画面にリダイレクト
//         }
//     }, [navigate]);

//     const handleSubmit = async () => {
//         const data = {
//             goal,
//             amazonLink1,
//             money1,
//             amazonLink2,
//             money2,
//             deadline
//         };

//         try {
//             await axios.post('https://backend.example.com/api/goal', data);
//             alert('データが送信されました');

//             // 目標が設定されたことをlocalStorageに保存
//             localStorage.setItem('isGoalSet', 'true');

//             // 次のページに遷移
//             navigate('/result');
//         } catch (error) {
//             console.error('エラーが発生しました', error);
//             alert('データ送信に失敗しました');
//         }
//     };

//     return (
//         <Container maxWidth="md">
//             <Box my={4}>
//                 <Paper elevation={3} sx={{ p: 4, background: 'linear-gradient(145deg, #EEF2FF 0%, #E0E7FF 100%)' }}>
//                     <Typography variant="h4" component="h1" gutterBottom align="center" color="primary">
//                         目標設定
//                     </Typography>
//                     <Grid container spacing={3}>
//                         <Grid item xs={12}>
//                             <TextField
//                                 fullWidth
//                                 label="目標"
//                                 value={goal}
//                                 onChange={(e) => setGoal(e.target.value)}
//                                 variant="outlined"
//                             />
//                         </Grid>
//                         {[1, 2].map((person) => (
//                             <Grid item xs={12} key={person}>
//                                 <Paper elevation={2} sx={{ p: 2, mb: 2, background: '#F3F4F6' }}>
//                                     <Typography variant="h6" gutterBottom color="secondary">
//                                         {person}人目
//                                     </Typography>
//                                     <TextField
//                                         fullWidth
//                                         label="Amazonのリンクを入力"
//                                         value={person === 1 ? amazonLink1 : amazonLink2}
//                                         onChange={(e) => person === 1 ? setAmazonLink1(e.target.value) : setAmazonLink2(e.target.value)}
//                                         variant="outlined"
//                                         margin="normal"
//                                     />
//                                     <TextField
//                                         fullWidth
//                                         label="お金を入力"
//                                         value={person === 1 ? money1 : money2}
//                                         onChange={(e) => person === 1 ? setMoney1(e.target.value) : setMoney2(e.target.value)}
//                                         type="number"
//                                         variant="outlined"
//                                         margin="normal"
//                                     />
//                                 </Paper>
//                             </Grid>
//                         ))}
//                         {/* <Grid item xs={12}>
//                             <LocalizationProvider dateAdapter={AdapterDateFns}>
//                                 <DatePicker
//                                     label="目標達成期限を選択"
//                                     value={deadline}
//                                     onChange={(newValue) => setDeadline(newValue)}
//                                     renderInput={(params) => <TextField {...params} fullWidth variant="outlined" />}
//                                 />
//                             </LocalizationProvider>
//                         </Grid> */}
//                         <Grid item xs={12}>
//                             <LocalizationProvider dateAdapter={AdapterDayjs}>
//                                 <DatePicker
//                                     label="目標達成期限を選択"
//                                     value={deadline}
//                                     onChange={(newValue: Dayjs | null) => setDeadline(newValue)}
//                                     // renderInput={(params) =>
//                                     //     <TextField {...params} fullWidth variant="outlined" />
//                                     // }
//                                     slotProps={{
//                                         textField: { fullWidth: true, variant: 'outlined' }
//                                     }}
//                                 />
//                             </LocalizationProvider>
//                         </Grid>
//                         <Grid item xs={12}>
//                             <Button
//                                 variant="contained"
//                                 color="primary"
//                                 onClick={handleSubmit}
//                                 fullWidth
//                                 size="large"
//                                 sx={{ mt: 2 }}
//                             >
//                                 目標達成を報告する
//                             </Button>
//                         </Grid>
//                     </Grid>
//                 </Paper>
//             </Box>
//         </Container>
//     );
// }

// export default GoalSettingPage;
