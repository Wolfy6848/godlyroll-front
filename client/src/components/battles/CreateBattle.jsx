import React, { useState } from "react";
import { Box, Button, TextField, Typography, CircularProgress } from "@mui/material";

const CreateBattle = ({ onCreate }) => {
  const [battleName, setBattleName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCreate = async () => {
    if (!battleName.trim()) return;
    setLoading(true);
    try {
      await onCreate(battleName);
      setBattleName("");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ p: 2, maxWidth: 400, margin: "auto" }}>
      <Typography variant="h6" gutterBottom>Create a New Battle</Typography>
      <TextField
        fullWidth
        label="Battle Name"
        value={battleName}
        onChange={(e) => setBattleName(e.target.value)}
        disabled={loading}
        margin="normal"
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleCreate}
        disabled={loading || !battleName.trim()}
        fullWidth
      >
        {loading ? <CircularProgress size={24} /> : "Create Battle"}
      </Button>
    </Box>
  );
};

export default CreateBattle;
