// src/services/workService.js
import axios from 'axios';
import { CreateWorkDto } from 'src/dtos/CreateWorkDto';


class WorkService {
  private api;

  constructor() {
    // Создаем экземпляр axios с базовой конфигурацией
    this.api = axios.create({
      baseURL: 'http://localhost:5000', // Адрес вашего сервера
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  /**
   * Получение всех записей (GET /works)
   */
  async getAllWorks() {
    try {
      const response = await this.api.get('/works');
      return response.data;
    } catch (error) {
      console.error('Ошибка при получении списка работ:', error);
      throw error; // Пробрасываем ошибку дальше, чтобы компонент мог ее обработать
    }
  }

  /**
   * Создание новой записи (POST /works)
   * @param {Object} newWorkData - Объект с данными для создания
   */
  async createWork(newWorkData: CreateWorkDto) {
    try {
      const response = await this.api.post('/works', newWorkData);
      return response.data;
    } catch (error) {
      console.error('Ошибка при создании работы:', error);
      throw error;
    }
  }

  /**
   * Получение одной записи по ID (GET /works/:id)
   * @param {number} id - Идентификатор записи
   */
  async getWorkById(id: number) {
    try {
      const response = await this.api.get(`/works/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Ошибка при получении работы с ID ${id}:`, error);
      throw error;
    }
  }

  /**
   * Обновление существующей записи (PUT /works/:id)
   * @param {number} id - Идентификатор записи
   * @param {Object} updateData - Объект с обновляемыми полями
   */
  async updateWork(id: number, updateData: CreateWorkDto) {
    try {
      const response = await this.api.put(`/works/${id}`, updateData);
      return response.data;
    } catch (error) {
      console.error(`Ошибка при обновлении работы с ID ${id}:`, error);
      throw error;
    }
  }

  /**
   * Удаление записи (DELETE /works/:id)
   * @param {number} id - Идентификатор записи
   */
  async deleteWork(id: number) {
    try {
      await this.api.delete(`/works/${id}`);
      console.log(`Работа с ID ${id} успешно удалена.`);
    } catch (error) {
      console.error(`Ошибка при удалении работы с ID ${id}:`, error);
      throw error;
    }
  }

  async deleteMany(ids: number[]): Promise<void> {
    try {
      const requestBody = {
        ids: ids
      }
      
      await this.api.post('/works/delete-many', requestBody);
      console.log(`Успешно удалено ${ids.length} записей.`);
    } catch (error:any) {
      // Обработка ошибок
      if ('response' in error && error instanceof Object) {
        const err = error as any;
        console.error(`Ошибка сервера при пакетном удалении (${err.response.status}):`, err.response.data);
      } else if (error instanceof Error) {
        console.error('Сетевая ошибка:', error.message);
      } else {
        console.error('Неизвестная ошибка:', error);
      }
      throw error; // Пробрасываем ошибку для обработки в компоненте
    }
  }
}

// Экспортируем не класс, а сразу созданный экземпляр (синглтон).
// Это позволяет избежать создания нового объекта каждый раз при импорте.
export default new WorkService();