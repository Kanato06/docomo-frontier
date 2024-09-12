import React, { useState, useEffect, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Button, Box, Typography, Container, Paper, Input, IconButton, Grid, 
  Card, CardContent, Chip, Divider, LinearProgress
} from '@mui/material';
import { 
  ArrowBack as ArrowBackIcon, 
  CloudUpload as CloudUploadIcon, 
  AccessTime as AccessTimeIcon, 
  CheckCircle as CheckCircleIcon, 
  Cancel as CancelIcon,
  EmojiEvents as EmojiEventsIcon,
  CalendarToday as CalendarTodayIcon
} from '@mui/icons-material';

// 審査ステータスの型を定義
enum AuditStatus {
  PENDING = '審査中',
  SUCCESS = '目標達成',
  FAILURE = '失敗'
}

// ユーザー目標のインターフェース
interface UserGoal {
  goal: string;
  reward: string;
  amount: number;
  status: string;
  deadline: string;
}

export default function GoalResultPage() {
  const navigate = useNavigate();
  const [image, setImage] = useState<File | null>(null);
  const [auditStatus, setAuditStatus] = useState<AuditStatus>(AuditStatus.PENDING);
  const [userGoals, setUserGoals] = useState<UserGoal[]>([]);

  // 画像アップロードハンドラ
  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    setImage(file);
    if (file) {
      setAuditStatus(AuditStatus.SUCCESS);
    }
  };

  // ステータスアイコンを取得する関数
  const getStatusIcon = (status: AuditStatus) => {
    switch (status) {
      case AuditStatus.PENDING:
        return <AccessTimeIcon sx={{ fontSize: 48, color: '#FCD34D' }} />;
      case AuditStatus.SUCCESS:
        return <CheckCircleIcon sx={{ fontSize: 48, color: '#10B981' }} />;
      case AuditStatus.FAILURE:
        return <CancelIcon sx={{ fontSize: 48, color: '#EF4444' }} />;
      default:
        return null;
    }
  };

  // 戻るボタンのハンドラ
  const handleGoBack = () => navigate('/');

  // バックエンドから目標データを取得
  useEffect(() => {
    const fetchData = async () => {
      // APIからデータを取得する部分（ダミーデータとして設定）
      const data: UserGoal[] = [
        { goal: '体重60キロ以下', reward: '新しいPC', amount: 100000, status: '審査中', deadline: '2024-12-31' },
        { goal: '体重60キロ以下', reward: '高級ディナー', amount: 20000, status: '審査中', deadline: '2024-12-31' },
      ];
      setUserGoals(data);
    };
    fetchData();
  }, []);

  // ユーザーの目標情報を表示
  const renderUserGoals = () => (
    <Box>
      {userGoals.map((userGoal, index) => (
        <Card key={index} sx={{ mb: 4, boxShadow: 3, borderRadius: 2 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom color="primary">
              {index + 1}人目の目標
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center' }}>
                  <EmojiEventsIcon sx={{ mr: 1, color: 'primary.main' }} />
                  <strong>目標:</strong> {userGoal.goal}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center' }}>
                  <CloudUploadIcon sx={{ mr: 1, color: 'secondary.main' }} />
                  <strong>ご褒美:</strong> {userGoal.reward} 
                  <Chip 
                    label={`${userGoal.amount.toLocaleString()}円`} 
                    size="small" 
                    color="secondary" 
                    sx={{ ml: 1 }}
                  />
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center' }}>
                  <CheckCircleIcon sx={{ mr: 1, color: 'success.main' }} />
                  <strong>審査状況:</strong> 
                  <Chip 
                    label={userGoal.status} 
                    size="small" 
                    color={userGoal.status === '目標達成' ? 'success' : 'warning'} 
                    sx={{ ml: 1 }}
                  />
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center' }}>
                  <CalendarTodayIcon sx={{ mr: 1, color: 'info.main' }} />
                  <strong>達成期限:</strong> {userGoal.deadline}
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      ))}
    </Box>
  );

  // 画像アップロードフォーム
  const renderImageUpload = () => (
    <Box my={3}>
      <Typography variant="h5" gutterBottom color="primary" sx={{ textAlign: 'center' }}>
        目標達成の証明画像
      </Typography>
      <Paper variant="outlined" sx={{ p: 2, borderRadius: 2 }}>
        <Input
          type="file"
          onChange={handleImageUpload}
          disableUnderline
          fullWidth
          inputProps={{ accept: 'image/*' }}
          sx={{ display: 'none' }}
          id="image-upload-input"
        />
        <label htmlFor="image-upload-input">
          <Button
            variant="outlined"
            component="span"
            startIcon={<CloudUploadIcon />}
            fullWidth
          >
            画像をアップロード
          </Button>
        </label>
        {image && (
          <Typography variant="body2" sx={{ mt: 1 }}>
            選択された画像: {image.name}
          </Typography>
        )}
      </Paper>
    </Box>
  );

  // 審査結果の表示
  const renderAuditResult = () => (
    <Box my={4} textAlign="center">
      <Typography variant="h5" gutterBottom color="primary">
        審査結果
      </Typography>
      <Paper elevation={3} sx={{ p: 3, borderRadius: 2, background: '#F3F4F6' }}>
        {getStatusIcon(auditStatus)}
        <Typography variant="h6" color="textSecondary" sx={{ mt: 2 }}>
          {auditStatus}
        </Typography>
        <LinearProgress 
          variant="determinate" 
          value={auditStatus === AuditStatus.SUCCESS ? 100 : 50} 
          sx={{ mt: 2 }}
        />
      </Paper>
    </Box>
  );

  return (
    <Container maxWidth="md">
      <Box my={4}>
        <Paper elevation={3} sx={{ p: 4, background: 'linear-gradient(180deg, #EEF2FF 0%, #E0E7FF 100%)', borderRadius: 2, minHeight: '100vh' }}>
          <Typography variant="h4" component="h1" gutterBottom align="center" color="primary" sx={{ mb: 4 }}>
            目標の進捗状況
          </Typography>
          {renderUserGoals()}
          <Divider sx={{ my: 4 }} />
          {renderImageUpload()}
          {renderAuditResult()}
          <Button
            variant="contained"
            color="primary"
            fullWidth
            startIcon={<ArrowBackIcon />}
            onClick={handleGoBack}
            size="large"
            sx={{ mt: 2 }}
          >
            目標設定ページに戻る
          </Button>
        </Paper>
      </Box>
    </Container>
  );
}

// import React, { useState, ChangeEvent } from 'react';
// import { useNavigate } from 'react-router-dom';
// import {
//     Button,
//     Box,
//     Typography,
//     Container,
//     Paper,
//     Input,
//     IconButton
// } from '@mui/material';
// import {
//     ArrowBack as ArrowBackIcon,
//     CloudUpload as CloudUploadIcon,
//     AccessTime as AccessTimeIcon,
//     CheckCircle as CheckCircleIcon,
//     Cancel as CancelIcon
// } from '@mui/icons-material';

// // 審査ステータスの型を定義
// enum AuditStatus {
//     PENDING = '審査中',
//     SUCCESS = '目標達成',
//     FAILURE = '失敗'
// }

// function GoalResultPage() {
//     const navigate = useNavigate();
//     const [image, setImage] = useState<File | null>(null);  // ファイルの型を指定
//     const [auditStatus, setAuditStatus] = useState<AuditStatus>(AuditStatus.PENDING);  // Enumの型を使用

//     const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
//         if (event.target.files && event.target.files[0]) {
//             setImage(event.target.files[0]);
//             // ここで画像をバックエンドにアップロードする処理を追加
//             // アップロード後、バックエンドからの応答に基づいて setAuditStatus を更新
//         }
//     };

//     const getStatusIcon = (status: AuditStatus) => {
//         switch (status) {
//             case AuditStatus.PENDING:
//                 return <AccessTimeIcon style={{ fontSize: 48, color: '#FCD34D' }} />;
//             case AuditStatus.SUCCESS:
//                 return <CheckCircleIcon style={{ fontSize: 48, color: '#10B981' }} />;
//             case AuditStatus.FAILURE:
//                 return <CancelIcon style={{ fontSize: 48, color: '#EF4444' }} />;
//             default:
//                 return null;
//         }
//     };

//     const handleGoBack = () => {
//         navigate('/');
//     };

//     return (
//         <Container maxWidth="sm">
//             <Box my={4}>
//                 <Paper elevation={3} sx={{
//                     p: 4,
//                     background: 'linear-gradient(145deg, #EEF2FF 0%, #E0E7FF 100%)',
//                     borderRadius: 2
//                 }}>
//                     <Typography variant="h4" component="h1" gutterBottom align="center" color="primary">
//                         目標達成結果
//                     </Typography>
//                     <Box my={3}>
//                         <Typography variant="h6" gutterBottom>
//                             目標達成の証明画像
//                         </Typography>
//                         <Input
//                             type="file"
//                             onChange={handleImageUpload}
//                             disableUnderline
//                             fullWidth
//                             endAdornment={
//                                 <IconButton component="span">
//                                     <CloudUploadIcon />
//                                 </IconButton>
//                             }
//                         />
//                     </Box>
//                     <Box my={4} textAlign="center">
//                         <Typography variant="h5" gutterBottom>
//                             審査結果
//                         </Typography>
//                         {getStatusIcon(auditStatus)}
//                         <Typography variant="h6" color="textSecondary">
//                             {auditStatus}
//                         </Typography>
//                     </Box>
//                     <Button
//                         variant="contained"
//                         color="primary"
//                         fullWidth
//                         startIcon={<ArrowBackIcon />}
//                         onClick={handleGoBack}
//                     >
//                         目標設定ページに戻る
//                     </Button>
//                 </Paper>
//             </Box>
//         </Container>
//     );
// }

// export default GoalResultPage;
