"use client";

import { Spinner } from "@/components/Spinner";
import { SubredditsList } from "@/components/SubredditsList";
import { deleteSubreddits, getSubredditsByPage, getTotalPages, saveSubredditsApi } from "@/services/subredditService";
import { useEffect, useState } from "react";

export default function Subreddits() {
  const [subreddits, setSubreddits] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [paginas, setPaginas] = useState<any[]>([]);
  const [paginaActual, setpaginaActual] = useState<number>(1);

  useEffect(() => {
    getSubreddits(1);
    getPages();
  }, []);

  const getSubreddits = async (page: number) => {
    try {
      setIsLoading(true);
      const response = await getSubredditsByPage(page);
      if (response.ok) {
        const data = await response.json();
        setpaginaActual(page);
        setSubreddits(data);
      }
    } catch (error) {
      console.log(error);
    }finally{
      setIsLoading(false);
    }
  }

  const getPages = async () => {
    try {
      setIsLoading(true);
      const response = await getTotalPages();
      if (response.ok) {
        const data = await response.json();
        const arr = Array.from({ length: data }, (_, i) => i + 1)
        console.log(arr);
        setPaginas(arr);
      }
    } catch (error) {
      console.log(error);
    }finally{
      setIsLoading(false);
    }
  }

  const saveSubreddits = async () => {
    try {
      setIsLoading(true);
      const response = await saveSubredditsApi();;
      if (response.ok) {
        const data = await response.json();
        getSubreddits(1);
        getPages();
      }else{
        console.log(response);
      }
    } catch (error) {
      console.log(error);
    }finally{
      setIsLoading(false);
    }
  }

  const deleteRecords = async () => {
    try {
      setIsLoading(true);
      const response = await deleteSubreddits();;
      if (response.ok) {
        const data = await response.json();
        getSubreddits(1);
        getPages();
      }else{
        console.log(response);
      }
    } catch (error) {
      console.log(error);
    }finally{
      setIsLoading(false);
    }
  }

  const avanzar = () => {
    setpaginaActual(paginaActual+1);
  }

  const retroceder = () => {
    setpaginaActual(paginaActual-1);
  }

  return (
    <div className="md:w-[90%] mx-auto bg-gray-100 py-10 min-h-[100vh] border-t-4 border-t-[#FF5700]">
      {/* <img className="mx-auto w-96" src="https://logos-world.net/wp-content/uploads/2023/12/Reddit-Logo.png" alt="Reddit" /> */}
      <h2 className="text-center text-4xl font-bold">Lista de subreddits</h2>
      <hr className="border-gray-300 w-10/12 mx-auto mt-8" />
      <div className="text-center">
        <button onClick={saveSubreddits} className="bg-[#FF5700] hover:bg-[#ec4f00] text-white py-1 px-4 cursor-pointer rounded-2xl mx-5 my-5">Consultar información en la API</button>
        <button onClick={deleteRecords} className="bg-gray-500 hover:bg-gray-600 text-white py-1 px-4 cursor-pointer rounded-2xl mx-5 my-5">Eliminar registros de la base de datos</button>
      </div>
      {
        isLoading ?
        <Spinner />
        :
        <>
          <SubredditsList subreddits={subreddits} />
          {
            subreddits.length > 0 &&
            <div className="flex justify-center my-10">
              <button disabled = {paginaActual == 1 } className={`px-2 py-1 rounded-full border bg-gray-100 text-gray-400 mx-4 ${paginaActual == 1 ? "cursor-not-allowed": "cursor-pointer"}`} onClick={() => getSubreddits(paginaActual-1)} >←</button>
              {
                paginas.map( (_,i) => 
                  <button className={`px-2 py-1 rounded-full border cursor-pointer mx-4 ${paginaActual == i+1 ? "bg-[#FF5700] text-white": "bg-gray-100 text-gray-400" }`} key={i} onClick={() => getSubreddits(i+1)}>
                    {i+1}
                  </button>
                  
                )
              }
              <button disabled = {paginaActual == paginas.length } className={`px-2 py-1 rounded-full border bg-gray-100 text-gray-400 mx-4 ${paginaActual == paginas.length ? "cursor-not-allowed": "cursor-pointer"}`} onClick={() => getSubreddits(paginaActual+1)} >→</button>
            </div>
          }
        </>
        
      }
    </div>
    
  );
}
