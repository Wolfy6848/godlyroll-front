import React, { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";

const PlayAmount = ({ maxAmount, onPlay }) => {
  const [amount, setAmount] = useState("");

  const handlePlay = () => {
    const numericAmount = parseFloat(amount);
    if (!numericAmount || numericAmount <= 0 || numericAmount > maxAmount) return;
    onPlay(numericAmount);
  };

  return (
    <Box sx={{ p: 2, maxWidth: 400, margin: "auto" }}>
      <Typography variant="h6" gutterBottom>Enter Amount to Play</Typography>
      <TextField
        fullWidth
        type="number"
        label={`Amount (max ${maxAmount})`}
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        inputProps={{ min: 0, max: maxAmount }}
        margin="normal"
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handlePlay}
        disabled={!amount || parseFloat(amount) <= 0 || parseFloat(amount) > maxAmount}
        fullWidth
      >
        Play
      </Button>
    </Box>
  );
};

export default PlayAmount;
