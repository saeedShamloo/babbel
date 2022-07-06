import React from "react";
import { Button, Card, Typography } from "../lib";

export function PlayerCard({ player, disabledRoll, onRoll, score }) {
  return (
    <Card
      title={player?.name ?? ""}
      avatar={player?.imageUrl ?? ""}
      aria-label="player"
      action={
        <Button
          disabled={disabledRoll}
          onClick={!disabledRoll ? onRoll : undefined}
          fullWidth
        >
          Roll
        </Button>
      }
    >
      <Typography variant="paragraph">Score: {score ?? "---"}</Typography>
    </Card>
  );
}
