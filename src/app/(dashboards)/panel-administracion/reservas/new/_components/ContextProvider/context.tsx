"use client";

import { Room } from "@/types/Room/room";
import React, { useContext } from "react";
import { createContext, useState } from "react";

interface AddedRoom {
  room: Room;
  checkIn: Date;
  checkOut: Date;
}

interface SearchContextType {
  searching: boolean;
  setSearching: Function;
  addedRooms: AddedRoom[];
  setAddedRooms: (rooms: AddedRoom[]) => void;
  addRoom: (room: AddedRoom) => void;
  removeRoom: (id: string) => void;
  showCart: boolean;
  setShowCart: (boolean: boolean) => void;
}

const SearchContext = createContext<SearchContextType>({
  searching: false,
  setSearching: () => {},
  addedRooms: [],
  setAddedRooms: () => {},
  addRoom: () => {},
  removeRoom: () => {},
  showCart: false,
  setShowCart: () => {},
});

export const useSearchContext = () => useContext(SearchContext);

const ContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [searching, setSearching] = useState(false);
  const [addedRooms, setAddedRooms] = useState<AddedRoom[]>([]);
  const [showCart, setShowCart] = useState(false);

  const addRoom = (room: AddedRoom) => {
    setAddedRooms([...addedRooms, room]);
  };

  const removeRoom = (id: string) => {
    setAddedRooms(addedRooms.filter((room) => room.room.id !== id));
  };

  return (
    <SearchContext.Provider
      value={{
        searching,
        setSearching,
        addedRooms,
        setAddedRooms,
        addRoom,
        removeRoom,
        showCart,
        setShowCart,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export default ContextProvider;
