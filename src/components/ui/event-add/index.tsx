import {TEventAddModalProps} from './types'
import styles from './event-add.module.css'
import { ticketsCase } from '../../../utils/tickets-case';
import { memo } from 'react';
import { extraImg } from '../../../utils/extra-img';

export const EventAddUI = memo(({ newEvent, onSave, onChange, onCancel }: TEventAddModalProps) => {
    return (
        <div className={styles.wrapper}>
            <form onSubmit={onSave} className={styles.form}>
                <div className={styles.imageContainer}>
                    <img 
                        src={newEvent.image || extraImg}
                        onError={(e) => e.currentTarget.src = extraImg} 
                        alt={newEvent.title} 
                        className={styles.image} 
                    />
                    <input
                        type="text"
                        value={newEvent.image}
                        onChange={(e) => onChange('image', e.target.value)}
                        placeholder="Ссылка на изображение"
                        className={styles.imageUrlInput}
                    />
                </div>

                <div className={styles.content}>
                    <input
                        className={styles.titleInput}
                        value={newEvent.title}
                        onChange={(e) => onChange('title', e.target.value)}
                        placeholder="Название мероприятия"
                    />

                    <div className={styles.categoriesInputContainer}>
                        <input
                            value={newEvent.categories.join(', ')}
                            onChange={(e) => onChange('categories', e.target.value.split(',').map(s => s.trim()))}
                            placeholder="Категории (через запятую)"
                            className={styles.categoriesInput}
                        />
                    </div>

                    <textarea
                        className={styles.descriptionInput}
                        value={newEvent.description}
                        onChange={(e) => onChange('description', e.target.value)}
                        placeholder="Описание"
                        rows={3}
                    />

                    <div className={styles.detailsContainer}>
                        <div className={styles.detailInput}>
                            <label className={styles.detailLabel}>Место проведения:</label>
                            <input
                                className={styles.locationInput}
                                value={newEvent.location}
                                onChange={(e) => onChange('location', e.target.value)}
                                placeholder="Введите место"
                            />
                        </div>

                        <div className={styles.detailInput}>
                            <label className={styles.detailLabel}>Дата и время:</label>
                            <input
                                type="date"
                                value={new Date(newEvent.date).toLocaleDateString('en-CA')}
                                onChange={(e) => onChange('date', e.target.value + 'T00:00:00')}
                                className={styles.dateInput}
                            />
                        </div>

                        {newEvent.price !== undefined && (
                            <div className={styles.detailInput}>
                                <label className={styles.detailLabel}>Цена билета (₽):</label>
                                <input
                                    type="number"
                                    value={newEvent.price}
                                    onChange={(e) => onChange('price', Number(e.target.value))}
                                    placeholder="0"
                                    min="0"
                                    className={styles.priceInput}
                                />
                            </div>
                        )}
                    </div>

                    <div className={styles.controls}>
                        <button type="button" onClick={onCancel} className={styles.cancelBtn}>
                            Отменить
                        </button>
                        <button type="submit" className={styles.saveBtn}>
                            Добавить мероприятие
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
});