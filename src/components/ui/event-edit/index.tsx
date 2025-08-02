import {TEventEditModalProps} from './types'
import styles from './event-edit.module.css'
import { ticketsCase } from '../../../utils/tickets-case';
import { memo } from 'react';

export const EventEditUI = memo(({ event, editedEvent, onSave, onChange, onCancel }: TEventEditModalProps) => {
    return (
        <div className={styles.wrapper}>
            <form onSubmit={onSave} className={styles.form}>
                <div className={styles.imageContainer}>
                    <img 
                        src={editedEvent.image} 
                        alt={editedEvent.title} 
                        className={styles.image} 
                    />
                    <input
                        type="text"
                        value={editedEvent.image}
                        onChange={(e) => onChange('image', e.target.value)}
                        placeholder="Ссылка на изображение"
                        className={styles.imageUrlInput}
                    />
                </div>

                <div className={styles.content}>
                    <input
                        className={styles.titleInput}
                        value={editedEvent.title}
                        onChange={(e) => onChange('title', e.target.value)}
                        placeholder="Название мероприятия"
                    />

                    <div className={styles.categoriesInputContainer}>
                        <input
                            value={editedEvent.categories.join(', ')}
                            onChange={(e) => onChange('categories', e.target.value.split(',').map(s => s.trim()))}
                            placeholder="Категории (через запятую)"
                            className={styles.categoriesInput}
                        />
                    </div>

                    <textarea
                        className={styles.descriptionInput}
                        value={editedEvent.description}
                        onChange={(e) => onChange('description', e.target.value)}
                        placeholder="Описание"
                        rows={3}
                    />

                    <div className={styles.detailsContainer}>
                        <div className={styles.detailInput}>
                            <label className={styles.detailLabel}>Место проведения:</label>
                            <input
                                className={styles.locationInput}
                                value={editedEvent.location}
                                onChange={(e) => onChange('location', e.target.value)}
                                placeholder="Введите место"
                            />
                        </div>

                        <div className={styles.detailInput}>
                            <label className={styles.detailLabel}>Дата и время:</label>
                            <input
                                type="date"
                                value={new Date(editedEvent.date).toLocaleDateString('en-CA')}
                                onChange={(e) => onChange('date', e.target.value + 'T00:00:00')}
                                className={styles.dateInput}
                            />
                        </div>

                        {editedEvent.price !== undefined && (
                            <div className={styles.detailInput}>
                                <label className={styles.detailLabel}>Цена билета (₽):</label>
                                <input
                                    type="number"
                                    value={editedEvent.price}
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
                            Отменить изменения
                        </button>
                        <button type="submit" className={styles.saveBtn}>
                            Сохранить
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
});