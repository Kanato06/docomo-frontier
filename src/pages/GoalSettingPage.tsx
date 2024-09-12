import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import { useHandleNavigation } from "../components/navigation";
import {
  TextField,
  Button,
  Box,
  Typography,
  Container,
  Paper,
  Grid,
} from "@mui/material";
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
  const [money1, setMoney1] = useState<string>("");
  const [amazonLink2, setAmazonLink2] = useState<string>("");
  const [money2, setMoney2] = useState<string>("");
  const [deadline, setDeadline] = useState<Dayjs | null>(null);
  const [goalId, setGoalId] = useState<number>(0);

  useEffect(() => {
    const storedGoalId = localStorage.getItem("goalId");
    if (storedGoalId) {
      setGoalId(parseInt(storedGoalId, 10));
    }
  }, []);

  const handleSubmit = async () => {
    setGoalId((prevGoalId) => {
      const newGoalId = prevGoalId + 1;
      localStorage.setItem("goalId", newGoalId.toString());
      return newGoalId;
    });
    const data = {
      goalId: goalId,
      goal: goal,
      reward1: amazonLink1,
      money1: parseInt(money1),
      reward2: amazonLink2,
      money2: parseInt(money2),
      goalDate: deadline ? deadline.format("YYYY-MM-DD") : null,
    };
    await client.models.GoalForTwoUsers.create(data);

    handleNavigation("/goal-result");
  };

  const renderAmazonFields = (person: number) => (
    <Paper elevation={2} sx={{ p: 2, mb: 2, background: "#F3F4F6" }}>
      <Typography variant="h6" gutterBottom color="secondary">
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
      />
      <TextField
        fullWidth
        label="金額を入力"
        value={person === 1 ? money1 : money2}
        onChange={(e) =>
          person === 1 ? setMoney1(e.target.value) : setMoney2(e.target.value)
        }
        type="number"
        variant="outlined"
        margin="normal"
      />
    </Paper>
  );

  return (
    <>
      {/* Headerを挿入 */}
      <Header />

      <Container maxWidth="md">
        <Box my={4}>
          <Paper
            elevation={3}
            sx={{
              p: 4,
              background: "linear-gradient(145deg, #EEF2FF 0%, #E0E7FF 100%)",
            }}
          >
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
                />
              </Grid>
              {[1, 2].map((person) => (
                <Grid item xs={12} key={person}>
                  {renderAmazonFields(person)}
                </Grid>
              ))}
              <Grid item xs={12}>
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
          </Paper>
        </Box>
      </Container>
    </>
  );
};

export default GoalSettingPage;
