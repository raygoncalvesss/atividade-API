"use client";

import axios from "axios";
import { useEffect, useState } from "react";

import styles from "./HarryPotter.module.css";

const PersonagemList = () => {
  const url = "https://hp-api.onrender.com/"; //link da API externa

  const [personagems, setPersonagems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchPersonagems = async () => {
        try {
            setLoading(true)
            const response = await axios.get(url);
            setPersonagems(response.data)
            setLoading(false);
        } catch (error) {
            console.log("Erro ao buscar personagens na API");
            setError("Não foi possivel carregar os personagens. Tente novamente mais tarde! #Sorry");
            setLoading(false);
        }
    };

    fetchPersonagems();
  }, []);

  if (loading) {
    return (
        <div className={styles.loading}>
            Carregando personagens...
        </div>
    )
  }

  if (error) {
    return (
        <div className={styles.error}>
            {error}
        </div>
    )
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Personagens do Hp</h1>
      <div className={styles.personagemGrid}>
        {personagems.map((personagem) => (
          <div key={personagem.id} className={styles.personagemCard}>
            <div className={styles.imageContainer}>
              <img src={personagem.image} alt={personagem.title} className={styles.image} />
            </div>
            <div className={styles.content}>
              <h2 className={styles.personagemTitle}>{personagem.title}</h2>
              <p className={styles.director}>Diretor: {personagem.director}</p>
              <p className={styles.year}>{personagem.release_date}</p>
              <div className={styles.rating}>
                <span className={styles.score}>{personagem.rt_score}%</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HarryPotterList;