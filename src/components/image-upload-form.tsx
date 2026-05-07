'use client';
import { useState, useRef, ChangeEvent } from 'react';
import { Upload, X, Image as ImageIcon } from 'lucide-react';
import Image from 'next/image';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { useLanguage } from '@/lib/i18n';

interface ImageUploadFormProps {
  inputName: string;
  label: string;
  description: string;
}

export function ImageUploadForm({
  inputName,
  label,
  description,
}: ImageUploadFormProps) {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageData, setImageData] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { t } = useLanguage();

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const dataUri = e.target?.result as string;
        setImagePreview(dataUri);
        setImageData(dataUri);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setImagePreview(null);
    setImageData(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="w-full">
      <Input type="hidden" name={inputName} value={imageData || ''} />
      <Input
        type="file"
        id={inputName}
        ref={fileInputRef}
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
        required
      />
      {imagePreview ? (
        <div className="relative group w-full aspect-video rounded-lg border-2 border-dashed border-muted-foreground/50 overflow-hidden">
          <Image src={imagePreview} alt={t('Image preview')} fill style={{ objectFit: 'contain' }} />
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <Button
              type="button"
              variant="destructive"
              size="icon"
              onClick={handleRemoveImage}
              className="rounded-full"
            >
              <X className="h-5 w-5" />
              <span className="sr-only">{t('Remove image')}</span>
            </Button>
          </div>
        </div>
      ) : (
        <Label
          htmlFor={inputName}
          className="flex flex-col items-center justify-center w-full aspect-video border-2 border-dashed rounded-lg cursor-pointer bg-card hover:bg-muted transition-colors"
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6 text-center">
            <Upload className="w-10 h-10 mb-3 text-primary" />
            <p className="mb-2 text-sm text-muted-foreground">
              <span className="font-semibold">{label}</span>
            </p>
            <p className="text-xs text-muted-foreground px-4">{description}</p>
          </div>
        </Label>
      )}
    </div>
  );
}
