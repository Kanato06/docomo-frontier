import { useState, useEffect, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Box, Typography, Container, Paper, Input, Grid, Card, CardContent, Chip, Divider, LinearProgress } from "@mui/material";
import type { Schema } from "../../amplify/data/resource";


import {
    ArrowBack as ArrowBackIcon,
    CloudUpload as CloudUploadIcon,
    AccessTime as AccessTimeIcon,
    CheckCircle as CheckCircleIcon,
    Cancel as CancelIcon,
    EmojiEvents as EmojiEventsIcon,
    CalendarToday as CalendarTodayIcon,
} from "@mui/icons-material";

// 審査ステータスの型を定義
enum AuditStatus {
    PENDING = "審査中",
    SUCCESS = "目標達成",
    FAILURE = "失敗",
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
    const [auditStatus, setAuditStatus] = useState<AuditStatus>(
        AuditStatus.PENDING
    );
    const [userGoals, setUserGoals] = useState<UserGoal[]>([]);

    const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files ? event.target.files[0] : null;
        setImage(file);
        if (file) {
            setAuditStatus(AuditStatus.PENDING);
            // 画像アップロード処理を追加
            // ここでバックエンドと通信して審査ステータスを更新
            setTimeout(() => {
                setAuditStatus(AuditStatus.SUCCESS);
                const tmpdata = userGoals;
                tmpdata[0].status = "目標達成";
                tmpdata[1].status = "目標達成";
                setUserGoals(tmpdata);
            }, 3000);
        }
    };

    // ステータスアイコンを取得する関数
    const getStatusIcon = (status: AuditStatus) => {
        switch (status) {
            case AuditStatus.PENDING:
                return <AccessTimeIcon sx={{ fontSize: 48, color: "#FCD34D" }} />;
            case AuditStatus.SUCCESS:
                return <CheckCircleIcon sx={{ fontSize: 48, color: "#10B981" }} />;
            case AuditStatus.FAILURE:
                return <CancelIcon sx={{ fontSize: 48, color: "#EF4444" }} />;
            default:
                return null;
        }
    };

    // 戻るボタンのハンドラ
    const handleGoBack = () => navigate("/");

    const [goalForTwoUsers, setGoalForTwoUsers] = useState<Array<Schema["GoalForTwoUsers"]["type"]>>([]);

    // バックエンドから目標データを取得
    useEffect(() => {
        const maxGoalElement = goalForTwoUsers.reduce((max, current) => {
            // current.goalId が null または undefined の場合は比較しない
            if (current.goalId == null) {
                return max;
            }
            // max.goalId が null または undefined の場合、current を新たな max とする
            if (max.goalId == null || current.goalId > max.goalId) {
                return current;
            }
            return max;
        });
        setGoalForTwoUsers([maxGoalElement]);

        const tmpgoal = maxGoalElement.goal;
        const tmpreward1 = maxGoalElement.reward1;
        const tmpmoney1 = maxGoalElement.money1;
        const tmpreward2 = maxGoalElement.reward2;
        const tmpmoney2 = maxGoalElement.money2;
        const tmpgoalDate = maxGoalElement.goalDate;

        const fetchData = async () => {
            // APIからデータを取得する部分（ダミーデータとして設定）
            const data: UserGoal[] = [
                {
                    goal: tmpgoal ?? "",
                    reward: tmpreward1 ?? "",
                    amount: tmpmoney1 ?? 0,
                    status: "審査中",
                    deadline: tmpgoalDate ?? "",
                },
                {
                    goal: tmpgoal ?? "",
                    reward: tmpreward2 ?? "",
                    amount: tmpmoney2 ?? 0,
                    status: "審査中",
                    deadline: tmpgoalDate ?? "",
                },
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
                                <Typography
                                    variant="body1"
                                    sx={{ display: "flex", alignItems: "center" }}
                                >
                                    <EmojiEventsIcon sx={{ mr: 1, color: "primary.main" }} />
                                    <strong>目標:</strong> {userGoal.goal}
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography
                                    variant="body1"
                                    sx={{ display: "flex", alignItems: "center" }}
                                >
                                    <CloudUploadIcon sx={{ mr: 1, color: "secondary.main" }} />
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
                                <Typography
                                    variant="body1"
                                    sx={{ display: "flex", alignItems: "center" }}
                                >
                                    <CheckCircleIcon sx={{ mr: 1, color: "success.main" }} />
                                    <strong>審査状況:</strong>
                                    <Chip
                                        label={userGoal.status}
                                        size="small"
                                        color={
                                            userGoal.status === "目標達成" ? "success" : "warning"
                                        }
                                        sx={{ ml: 1 }}
                                    />
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography
                                    variant="body1"
                                    sx={{ display: "flex", alignItems: "center" }}
                                >
                                    <CalendarTodayIcon sx={{ mr: 1, color: "info.main" }} />
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
            <Typography
                variant="h5"
                gutterBottom
                color="primary"
                sx={{ textAlign: "center" }}
            >
                目標達成の証明画像
            </Typography>
            <Paper variant="outlined" sx={{ p: 2, borderRadius: 2 }}>
                <Input
                    type="file"
                    onChange={handleImageUpload}
                    disableUnderline
                    fullWidth
                    inputProps={{ accept: "image/*" }}
                    sx={{ display: "none" }}
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
                最終審査結果
            </Typography>
            <Paper
                elevation={3}
                sx={{ p: 3, borderRadius: 2, background: "#F3F4F6" }}
            >
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
                <Paper
                    elevation={3}
                    sx={{
                        p: 4,
                        background: "linear-gradient(180deg, #EEF2FF 0%, #E0E7FF 100%)",
                        borderRadius: 2,
                        minHeight: "100vh",
                    }}
                >
                    <Typography
                        variant="h4"
                        component="h1"
                        gutterBottom
                        align="center"
                        color="primary"
                        sx={{ mb: 4 }}
                    >
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
