"use client";

import { Room } from "@/types/Room/room";
import React, { useContext } from "react";
import { createContext, useState } from "react";

interface SearchContextType {
  searching: boolean;
  setSearching: Function;
  addedRooms: Room[];
  addRoom: (room: Room) => void;
  removeRoom: (id: string) => void;
}

const SearchContext = createContext<SearchContextType>({
  searching: false,
  setSearching: () => {},
  addedRooms: [],
  addRoom: () => {},
  removeRoom: () => {},
});

export const useSearchContext = () => useContext(SearchContext);

const ContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [searching, setSearching] = useState(false);
  const [addedRooms, setAddedRooms] = useState<Room[]>([]);

  const addRoom = (room: Room) => {
    setAddedRooms([...addedRooms, room]);
  };

  const removeRoom = (id: string) => {
    setAddedRooms(addedRooms.filter((room) => room.id !== id));
  };

  return (
    <SearchContext.Provider
      value={{ searching, setSearching, addedRooms, addRoom, removeRoom }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export default ContextProvider;
