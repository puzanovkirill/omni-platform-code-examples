/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { useToast } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { uploadFiles } from '../../../helpers';
import { useUpdateAvatar } from './use-update-avatar.hook';

const useUploadAvatar = (personId: string) => {
  const { updateAvatar } = useUpdateAvatar();
  const { t } = useTranslation('components');
  const toast = useToast();
  const [images, setImages] = useState<string[]>([]);
  const [error, setError] = useState<string>('');

  const uploadFilesAction = (files: any) =>
    uploadFiles(files, setImages, setError);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    uploadFilesAction(e.target.files);
  };

  useEffect(
    () => () => {
      setImages([]);
      setError('');
    },
    []
  );

  useEffect(() => {
    if (images[0] && personId) {
      updateAvatar(images[0], personId);
      setImages([]);
      setError('');
    }
  }, [images]);

  useEffect(() => {
    if (error) {
      toast({
        title: t(`errors.${error}`),
        status: 'error',
        position: 'top',
        duration: 3000,
        isClosable: true,
      });
      setImages([]);
      setError('');
    }
  }, [error]);

  return { handleFileUpload };
};

export { useUploadAvatar };
