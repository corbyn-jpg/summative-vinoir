import React from "react";
import {
  Box,
  Typography,
  Grid,
  Paper,
  Button,
  IconButton,
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";

const emojiOptions = [
  "🌹", "🌸", "🌼", "🌺", "🌷", "💐", "🍀", "🌿", "🍃", "🌾",
  "🌻", "🌵", "🌲", "🌳", "🌴", "🌱", "🌍", "🌞", "🌙", "✨",
  "💎", "🕊️", "🪷", "🪴", "🕯️", "🍋", "🍊", "🍎", "🍇", "🍓",
  "🍒", "🍑", "🥭", "🥂", "🍷", "🎉"
];

const EmojiSelector = ({
  selectedEmojis,
  setSelectedEmojis,
  maxLength = 5,
  disabled = false,
}) => {
  // Optionally: check if emoji already selected
  // const handleEmojiClick = (emoji) => {
  //   if (selectedEmojis.length >= maxLength || selectedEmojis.includes(emoji)) return;
  //   setSelectedEmojis((prev) => [...prev, emoji]);
  // };

  const handleEmojiClick = (emoji) => {
    if (selectedEmojis.length >= maxLength) return;
    setSelectedEmojis((prev) => [...prev, emoji]);
  };

  const handleRemoveEmoji = (index) => {
    setSelectedEmojis((prev) => prev.filter((_, i) => i !== index));
  };

  const handleClearEmojis = () => {
    setSelectedEmojis([]);
  };

  return (
    <Box sx={{ margin: "1.5rem 0" }}>
      <Typography
        variant="body1"
        sx={{
          fontWeight: "bold",
          color: "#444",
          marginBottom: "1rem",
          textAlign: "center",
        }}
      >
        {`Select your emoji password (${selectedEmojis.length}/${maxLength}):`}
      </Typography>

      <Grid container spacing={1} justifyContent="center" aria-label="Emoji selectors">
        {emojiOptions.map((emoji, index) => (
          <Grid item key={index}>
            <Paper
              elevation={3}
              role="button"
              tabIndex={disabled ? -1 : 0}
              aria-disabled={disabled}
              aria-label={`Select emoji ${emoji}`}
              sx={{
                padding: "0.5rem",
                borderRadius: "50%",
                textAlign: "center",
                cursor: disabled ? "default" : "pointer",
                fontSize: "1.5rem",
                transition: "transform 0.2s, box-shadow 0.2s",
                opacity: disabled ? 0.6 : 1,
                "&:hover, &:focus": {
                  transform: disabled ? "scale(1)" : "scale(1.2)",
                  boxShadow: disabled
                    ? "0 4px 8px rgba(0, 0, 0, 0.1)"
                    : "0 6px 12px rgba(0, 0, 0, 0.2)",
                  outline: "2px solid #146e3a"
                },
              }}
              onClick={() => !disabled && handleEmojiClick(emoji)}
              onKeyDown={e => {
                if (!disabled && (e.key === "Enter" || e.key === " ")) {
                  handleEmojiClick(emoji);
                }
              }}
            >
              {emoji}
            </Paper>
          </Grid>
        ))}
      </Grid>

      <Box sx={{ marginTop: "1.5rem", textAlign: "center" }}>
        {selectedEmojis.length > 0 ? (
          <>
            <Typography
              variant="body2"
              sx={{ marginBottom: "0.5rem", color: "#555" }}
            >
              Your emoji password:
            </Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                flexWrap: "wrap",
              }}
            >
              {selectedEmojis.map((emoji, index) => (
                <Box
                  key={`${emoji}-${index}`}
                  sx={{
                    position: "relative",
                    margin: "0.5rem",
                  }}
                >
                  <Paper
                    sx={{
                      fontSize: "1.8rem",
                      padding: "0.8rem",
                      borderRadius: "50%",
                      backgroundColor: "#e8f5e9",
                      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                    }}
                  >
                    {emoji}
                  </Paper>
                  {!disabled && (
                    <IconButton
                      size="small"
                      aria-label="Remove emoji from password"
                      sx={{
                        position: "absolute",
                        top: -8,
                        right: -8,
                        backgroundColor: "#ffebee",
                        "&:hover": { backgroundColor: "#ffcdd2" },
                      }}
                      onClick={() => handleRemoveEmoji(index)}
                    >
                      <ClearIcon fontSize="small" />
                    </IconButton>
                  )}
                </Box>
              ))}
            </Box>
          </>
        ) : (
          <Typography
            variant="body2"
            sx={{ color: "#777", fontStyle: "italic" }}
          >
            No emojis selected yet
          </Typography>
        )}
      </Box>

      {!disabled && selectedEmojis.length > 0 && (
        <Button
          variant="outlined"
          sx={{ marginTop: "1rem", display: "block", margin: "1rem auto 0" }}
          onClick={handleClearEmojis}
          startIcon={<ClearIcon />}
        >
          Clear Password
        </Button>
      )}
    </Box>
  );
};

export default EmojiSelector;
