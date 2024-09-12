

import React, { useState, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Box, Typography, Container, Paper, Input, IconButton } from '@mui/material';
import {
    ArrowBack as ArrowBackIcon,
    CloudUpload as CloudUploadIcon,
    AccessTime as AccessTimeIcon,
    CheckCircle as CheckCircleIcon,
    Cancel as CancelIcon
} from '@mui/icons-material';

// 審査ステータスの型を定義
enum AuditStatus {
    PENDING = '審査中',
    SUCCESS = '目標達成',
    FAILURE = '失敗'
}

const GoalResultPage: React.FC = () => {
    const navigate = useNavigate();
    // const [image, setImage] = useState<File | null>(null);
    const [auditStatus, setAuditStatus] = useState<AuditStatus>(AuditStatus.PENDING);

    // 画像アップロードハンドラ
    const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files ? event.target.files[0] : null;
        // setImage(file);
        if (file) {
            setAuditStatus(AuditStatus.PENDING);
            // 画像アップロード処理を追加
            // ここでバックエンドと通信して審査ステータスを更新
            setTimeout(() => {
                setAuditStatus(AuditStatus.SUCCESS);
            }, 3000);
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

    // 画像アップロードフォームのレンダリング
    const renderImageUpload = () => (
        <Box my={3}>
            <Typography variant="h6" gutterBottom>
                目標達成の証明画像
            </Typography>
            <Input
                type="file"
                onChange={handleImageUpload}
                disableUnderline
                fullWidth
                endAdornment={
                    <IconButton component="span">
                        <CloudUploadIcon />
                    </IconButton>
                }
            />
        </Box>
    );

    // 審査結果のレンダリング
    const renderAuditResult = () => (
        <Box my={4} textAlign="center">
            <Typography variant="h5" gutterBottom>
                審査結果
            </Typography>
            {getStatusIcon(auditStatus)}
            <Typography variant="h6" color="textSecondary">
                {auditStatus}
            </Typography>
        </Box>
    );

    return (
        <Container maxWidth="sm">
            <Box my={4}>
                <Paper elevation={3} sx={{ p: 4, background: 'linear-gradient(145deg, #EEF2FF 0%, #E0E7FF 100%)', borderRadius: 2 }}>
                    <Typography variant="h4" component="h1" gutterBottom align="center" color="primary">
                        目標達成結果
                    </Typography>
                    {renderImageUpload()}
                    {renderAuditResult()}
                    <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        startIcon={<ArrowBackIcon />}
                        onClick={handleGoBack}
                    >
                        目標設定ページに戻る
                    </Button>
                </Paper>
            </Box>
        </Container>
    );
};

export default GoalResultPage;
