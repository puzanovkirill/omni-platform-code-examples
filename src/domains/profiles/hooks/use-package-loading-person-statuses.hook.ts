import { useCallback, useEffect, useState } from 'react';
import { makeVar, useReactiveVar } from '@apollo/client';
import { useToast } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

export const personLoadingFiles = makeVar<File[]>([]);
type TUsePackageLoadingPersonStatuses = {
  fileLimit?: number;
  loadLimit?: number;
};

/**
 * Хук, который на основе загруженных в ReactiveVar файлов, а также переданных параметров,
 * возвращает кол-во загруженных файлов, кол-во ошибок, сами файлы, а так же максимальный
 * индекс до которого можно ставить файлы на загрузку.
 * @param fileLimit - максимальное кол-во файлов, которые можно загрузить
 * @param loadLimit - максимальное кол-во запросов выполняемых за раз
 */
function usePackageLoadingPersonStatuses({
  fileLimit = 10,
  loadLimit = 4,
}: TUsePackageLoadingPersonStatuses) {
  const personsFiles = useReactiveVar(personLoadingFiles);
  const toast = useToast();
  const { t } = useTranslation('components');
  const [successFilesCount, setSuccessFilesCount] = useState<number>(0);
  const [failedFilesCount, setFailedFilesCount] = useState<number>(0);
  const [maxFileLoadIndex, setMaxFileLoadIndex] = useState<number>(
    loadLimit - 1
  );
  const [filesCount, setFilesCount] = useState<number>(personsFiles.length);
  const [files, setFiles] = useState<File[]>(personsFiles);

  /**
   * Функиця очищающая все состояния, связанные с уже обработанными файлами
   */
  const clearStatusesState = () => {
    setSuccessFilesCount(0);
    setFailedFilesCount(0);
    setMaxFileLoadIndex(loadLimit - 1);
  };

  /**
   * Функиця очищающая глобальный список файлов,а также все состояния
   */
  const clearFiles = () => {
    personLoadingFiles([]);
    setFiles([]);
    setFilesCount(0);
    clearStatusesState();
  };

  /**
   * В этом хуке, после каждого обновления глобального списка файлов, мы проверяем:
   * не привышает ли лимита кол-во файлов для загрузки,если превышает, то мы берем
   * первые fileLimit файлов, а кол-во устанавливаем в fileLimit
   */
  useEffect(() => {
    const isLimitReach = personsFiles.length > fileLimit;
    if (isLimitReach) {
      toast({
        title: t('LoadingProfileTable.FileLimit'),
        description: t('LoadingProfileTable.FileLimitSubIno'),
        status: 'info',
        position: 'top',
        duration: 3000,
        isClosable: true,
      });
    }
    setFilesCount(isLimitReach ? fileLimit : personsFiles.length);
    setFiles(isLimitReach ? personsFiles.slice(0, fileLimit) : personsFiles);
    clearStatusesState();
  }, [personsFiles]);

  /**
   * Функция, которая увеличивает maxFileLoadIndex на 1, тем самым давая возможность
   * начать загружаться следующему файлу. Также на основе параметра status увеличивается
   * кол-во успешно загруженных или ошибочных файлов
   */
  const addFileLoadingStatus = useCallback(
    (status: 'error' | 'success') => {
      setMaxFileLoadIndex((prevMaxFileLoadIndex) => prevMaxFileLoadIndex + 1);
      if (status === 'error') {
        setFailedFilesCount((count) => count + 1);
      } else {
        setSuccessFilesCount((count) => count + 1);
      }
    },
    [setMaxFileLoadIndex, setFailedFilesCount, setSuccessFilesCount]
  );

  return {
    successFilesCount,
    loadingFilesCount: filesCount - failedFilesCount - successFilesCount,
    failedFilesCount,
    filesCount,
    files,
    maxFileLoadIndex,
    addFileLoadingStatus,
    clearFiles,
  };
}

export { usePackageLoadingPersonStatuses };
