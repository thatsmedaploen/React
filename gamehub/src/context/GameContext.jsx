import { createContext, useContext, useState} from "react";

const GameContext = createContext();

export function GameProvider({ children }) {
    const [wishlist, setWishlist] = useState([]);

    function toggleWishlist(gameId) {
        setWishlist((previousWishlist) => {
            if (previousWishlist.includes(gameId)) {
                return previousWishlist.filter((id) => id !== gameId);
            }
            return [...previousWishlist, gameId];
        });
    }
    const value = {
        wishlist,
        toggleWishlist,
    };

    return (
        <GameContext.Provider value={value}>
            { children }
        </GameContext.Provider>
    );
}

export function useGame() {
  return useContext(GameContext);
}