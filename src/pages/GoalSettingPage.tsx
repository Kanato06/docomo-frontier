import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import CommonLayout from "../components/CommonLayout";
import { useHandleNavigation } from "../components/navigation";
import { TextField, Button, Typography, Grid, Box, Alert } from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Dayjs } from "dayjs";
import type { Schema } from "../../amplify/data/resource";
import { generateClient } from "aws-amplify/data";
const client = generateClient<Schema>();

const GoalSettingPage: React.FC = () => {
  const handleNavigation = useHandleNavigation();

  const [goal, setGoal] = useState<string>("");
  const [amazonLink1, setAmazonLink1] = useState<string>("");
  const [money1, setMoney1] = useState<number | "">("");
  const [amazonLink2, setAmazonLink2] = useState<string>("");
  const [money2, setMoney2] = useState<number | "">("");
  const [deadline, setDeadline] = useState<Dayjs | null>(null);
  const [goalId, setGoalId] = useState<number>(0);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    const storedGoalId = localStorage.getItem("goalId");
    if (storedGoalId) {
      setGoalId(parseInt(storedGoalId, 10));
    }
  }, []);

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!goal) newErrors.goal = "目標を入力してください";
    if (!amazonLink1)
      newErrors.amazonLink1 = "ご褒美のリンクを入力してください";
    if (!money1 || isNaN(money1))
      newErrors.money1 = "金額を正しく入力してください";
    if (!amazonLink2)
      newErrors.amazonLink2 = "2人目のご褒美のリンクを入力してください";
    if (!money2 || isNaN(money2))
      newErrors.money2 = "2人目の金額を正しく入力してください";
    if (!deadline) newErrors.deadline = "期限を選択してください";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    setGoalId((prevGoalId) => {
      const newGoalId = prevGoalId + 1;
      localStorage.setItem("goalId", newGoalId.toString());
      return newGoalId;
    });

    const data = {
      goalId: goalId,
      goal: goal,
      reward1: amazonLink1,
      money1: money1 as number,
      reward2: amazonLink2,
      money2: money2 as number,
      goalDate: deadline ? deadline.format("YYYY-MM-DD") : null,
    };
    await client.models.GoalForTwoUsers.create(data);

    handleNavigation("/goal-result");
  };

  const renderAmazonFields = (person: number) => (
    <Grid item xs={12} key={person}>
      <Typography variant="h6" gutterBottom color="secondary.dark">
        {person}人目
      </Typography>
      <TextField
        fullWidth
        label="ご褒美に欲しいものを入力"
        value={person === 1 ? amazonLink1 : amazonLink2}
        onChange={(e) =>
          person === 1
            ? setAmazonLink1(e.target.value)
            : setAmazonLink2(e.target.value)
        }
        variant="outlined"
        margin="normal"
        error={Boolean(errors[`amazonLink${person}`])}
        helperText={errors[`amazonLink${person}`]}
      />
      <TextField
        fullWidth
        label="金額を入力"
        value={person === 1 ? money1 : money2}
        onChange={(e) =>
          person === 1
            ? setMoney1(Number(e.target.value))
            : setMoney2(Number(e.target.value))
        }
        type="number" // 数字のみを入力できるようにする
        variant="outlined"
        margin="normal"
        error={Boolean(errors[`money${person}`])}
        helperText={errors[`money${person}`]}
      />
    </Grid>
  );

  return (
    <>
      <Header />
      <Box sx={{ mt: 5 }}></Box>

      <CommonLayout>
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          align="center"
          color="primary"
        >
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
              error={Boolean(errors.goal)}
              helperText={errors.goal}
            />
          </Grid>
          {[1, 2].map((person) => renderAmazonFields(person))}
          <Grid item xs={12}>
            <Typography
              variant="h6"
              component="h1"
              gutterBottom
              align="center"
              color="secondary.dark"
            >
              期限設定
            </Typography>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="目標達成期限を選択"
                value={deadline}
                onChange={(newValue: Dayjs | null) => setDeadline(newValue)}
                slotProps={{
                  textField: { fullWidth: true, variant: "outlined" },
                }}
              />
            </LocalizationProvider>
            {errors.deadline && (
              <Alert severity="error">{errors.deadline}</Alert>
            )}
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmit}
              sx={{
                mt: 2,
                mb: 2,
                width: "200px",
                display: "block",
                mx: "auto",
                fontSize: "1.5rem",
              }}
            >
              決済
            </Button>
          </Grid>
        </Grid>
      </CommonLayout>
    </>
  );
};

export default GoalSettingPage;
