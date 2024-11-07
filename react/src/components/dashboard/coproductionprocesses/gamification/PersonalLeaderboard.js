import React from "react";
import OldGamificationLeaderboard from "./OldGamificationLeaderboard";
import NewGamificationLeaderboard from "./NewGamificationLeaderboard";

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
  if (gamification_engine === "GAME") {
    return (
      <NewGamificationLeaderboard user={user} game={game} loading={loading} />
    );
  }
  return <div>Not implemented yet.</div>;
};

export default PersonalLeaderboard;
