import React, { useState, useMemo } from "react";
import { useSelector } from "../../services/store";
import { EventsItem } from "../../components/events-item";
import styles from "./categories.module.css";
import { Link, useLocation } from "react-router-dom";

export const CategoriesPage: React.FC = () => {
  const events = useSelector(store => store.eventsReducer.data);
  const location = useLocation();

  // Собираем уникальные категории
  const categories = useMemo(() => {
    const set = new Set<string>();
    events.forEach(ev => ev.categories.forEach(cat => set.add(cat)));
    return Array.from(set);
  }, [events]);

  const [selected, setSelected] = useState<string | null>(null);

  // Отфильтрованные события
  const filtered = useMemo(() => {
    if (!selected) return [];
    return events.filter(ev => ev.categories.includes(selected));
  }, [events, selected]);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Категории</h2>

      <div className={styles.categoriesGrid}>
        {categories.map(cat => (
          <button
            key={cat}
            className={`${styles.categoryBtn} ${selected === cat ? styles.selected : ""}`}
            onClick={() => setSelected(cat)}
          >
            {cat}
          </button>
        ))}
        {selected && (
          <button
            className={styles.clearBtn}
            onClick={() => setSelected(null)}
          >
            Сбросить фильтр
          </button>
        )}
      </div>

      {selected && (
        <>
          <h3 className={styles.subtitle}>
            События в категории «{selected}»
          </h3>
          {filtered.length
            ? <div className={styles.eventsGrid}>
                {filtered.map(ev => (
                    <Link to={`/event/${ev.id}`} key={ev.id} state={{ backgroundLocation: location }} style={{ textDecoration: "none" }}>
                        <EventsItem event={ev}/>
                    </Link>
                ))}
              </div>
            : <p className={styles.empty}>Нет событий в этой категории</p>
          }
        </>
      )}
    </div>
  );
};
