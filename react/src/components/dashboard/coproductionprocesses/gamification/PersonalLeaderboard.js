import React from "react";
import OldGamificationLeaderboard from "./OldGamificationLeaderboard";

const PersonalLeaderboard = ({ user, game, place, loading }) => {
  const gamification_engine =
    game?.game_gamification_engine || "old_gamification";
  if (gamification_engine === "old_gamification") {
    return (
      <OldGamificationLeaderboard
        user={user}
        game={game}
        place={place}
        loading={loading}
      />
    );
  }
};

export default PersonalLeaderboard;
