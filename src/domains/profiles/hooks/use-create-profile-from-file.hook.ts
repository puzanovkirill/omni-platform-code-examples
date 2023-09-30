import { useEffect, useState } from 'react';
import { useCustomMutation } from '@3divi/shared-components';
import { useLazyQuery } from '@apollo/client';
import { imageToBase64, validateImageFile } from '../../../helpers';
import { MAX_IMAGE_SIZE } from '../../../consts';
import {
  CREATE_PROFILE,
  SEARCH_PERSONS_BY_IMAGE,
  TCreateProfileResponse,
  TSearchPersonsByImageResult,
} from '../requests';

type TStatuses = 'loading' | 'success' | 'failed' | 'pending';
type TUseCreateProfileFromFile = {
  file: File;
  handleLoadingEnd: (status: 'success' | 'error') => void;
  canFileLoad: boolean;
};

/**
 * Хук, который на основе файла с изображением создает персону. Возвращает текущий
 * статус создания персоны, а также ошибку, при ее возникновении.
 * @param file - файл с изображением персоны
 * @param handleLoadingEnd - колбэк, обрабатыващий статус создания персоны. Нужен
 * для того, чтобы освободить место в очереди для другого файла
 * @param canFileLoad - флаг, указывающий можно ли создать персону
 */
function useCreateProfileFromFile({
  file,
  handleLoadingEnd,
  canFileLoad,
}: TUseCreateProfileFromFile) {
  const [error, setError] = useState<string>('');
  const [base64, setBase64] = useState<string>('');
  const [status, setStatus] = useState<TStatuses>('pending');
  const [createProfile, { error: creatingError }] =
    useCustomMutation<TCreateProfileResponse>(CREATE_PROFILE);
  const [
    search,
    { called: searchCalled, data: searchData, error: searchError },
  ] = useLazyQuery<TSearchPersonsByImageResult>(SEARCH_PERSONS_BY_IMAGE, {
    fetchPolicy: 'network-only',
  });

  /**
   * Функция, которая будет вызвана после создания персоны в случае успеха. Если
   * все ок, то вызывается колбэк обработки статуса, а так же устанавливается сам
   * статус.
   * @param data - Response возвращаемый запросом на создание персоны
   */
  const onCompleted = (data: TCreateProfileResponse) => {
    if (data?.createProfile.ok) {
      handleLoadingEnd('success');
      setStatus('success');
    }
  };

  /**
   * Функция, которая будет вызвана после создания персоны в случае ошибки. Также
   * вызывается при ошибке валидации изображения. Вызывает колбэк обработки статуса,
   * а так же устанавливается сам статус и ошибка.
   * @param loadingError - текс ошикби, который установится в error
   */
  const onError = (loadingError: string) => {
    handleLoadingEnd('error');
    setStatus('failed');
    setError(loadingError);
  };

  /**
   * Хук, который следит за изменением canFileLoad, и в случае, когда можно создать
   * персону, запускает первый этап - валидацию. Если валидация не прошла, то дальнешие
   * работы останавливаются и вызывается onError. Если с валидацией все впорядке,
   * то изображение конвертируется в Base64.
   */
  useEffect(() => {
    if (canFileLoad && status === 'pending') {
      const validateError = validateImageFile(file);
      if (validateError === '') {
        imageToBase64(file, setBase64);
      } else {
        onError(validateError);
      }
    }
  }, [canFileLoad]);

  /**
   * Хук, который следит за статусом конвертации изображения в Base64. В случае если
   * конвертация удалась, проводится дополнительная проверка на размер получившегося
   * изображения. Дело в том, что Base64 формат может вылезти за пределы допустимного
   * размера Request'а и сервер будет дропать запрос. Если проверка не прошла
   * то вызывается onError, иначе ставится статус loading и отправляется запрос на
   * поиск дубликатов персоны.
   */
  useEffect(() => {
    if (base64 !== '' && status === 'pending' && canFileLoad) {
      if ((4 * base64.length) / 3 > MAX_IMAGE_SIZE) {
        onError('BigImageSize');
      } else {
        setStatus('loading');
        search({
          variables: { sourceImage: base64, confidenceThreshold: 0.85 },
        });
      }
    }
  }, [base64, canFileLoad]);

  /**
   * Хук, который отслеживает результат поиска. Если дубликаты не найдены,
   * то персона создается, иначе возвращается ошибка и создание не происходит.
   */
  useEffect(() => {
    if (
      searchCalled &&
      status === 'loading' &&
      canFileLoad &&
      searchData &&
      searchData.search[0]?.searchResult
    ) {
      if (
        // Кастомное условие тикет 584 Plaftorm PM
        !searchData.search[0].searchResult.filter((item) => item.profile).length
      ) {
        createProfile({
          variables: {
            image: base64,
          },
          onCompleted,
        });
      } else {
        onError('ProfileAlreadyExist');
      }
    }
  }, [searchCalled, status, base64, canFileLoad, searchData]);

  /**
   * Хук, отслеживающий состояние ошибки запроса на создание персоны. В случае
   * возникновения ошибки запроса вызывается onError и работа с файлом прекращается.
   */
  useEffect(() => {
    if ((creatingError || searchError) && status === 'loading') {
      onError(creatingError?.message ?? searchError?.message ?? '');
    }
  }, [creatingError, searchError]);

  return {
    status,
    error,
  };
}

export { useCreateProfileFromFile };
