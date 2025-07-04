"use client";
import { useEffect } from "react";
import { useState } from "react";

export default function Home() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetch("/api/users");
        const response = await data.json();
        console.log(response);
        setUsers(response);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Home</h1>
    </div>
  );
}
