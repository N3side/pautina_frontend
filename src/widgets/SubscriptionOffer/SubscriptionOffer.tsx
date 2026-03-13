import React from 'react';
import LanguageIcon from '@mui/icons-material/Language';
import DocumentScannerIcon from '@mui/icons-material/DocumentScanner';
import BlockIcon from '@mui/icons-material/Block';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import {Button} from "@mui/material";
import ButtonLarge from "@/shared/ui/Buttons/ButtonLarge";
import Gradient from "@/shared/ui/IconContainers/Gradient";

// 1. Отдельный компонент для каждого преимущества
const BenefitItem = ({ title, description, Icon }) => {
    return (
        <div className="!flex !items-start !gap-4 !p-3 !rounded-2xl !transition-colors !duration-300">

            {/* Контейнер иконки с анимированным градиентом */}
            <Gradient>
                <Icon className="text-white" sx={{fontSize: "18px"}} />
            </Gradient>

            <div className="flex flex-col justify-center">
                <p className="text-secondary text-text-main font-semibold mt-1">
                    {title}
                </p>
                <p className="text-small text-text-muted">
                    {description}
                </p>
            </div>
        </div>
    );
};

// 2. Главный компонент формы подписки
export default function SubscriptionOffer() {
    const benefits = [
        {
            title: "Кастомный поддомен",
            description: "Уникальный юзернейм в нашем поддомене для вашего профиля.",
            Icon: LanguageIcon
        },
        {
            title: "ИИ-распознавание",
            description: "До 20 распознаваний документов с помощью нейросети в месяц.",
            Icon: DocumentScannerIcon
        },
        {
            title: "Никакой рекламы",
            description: "Полное отключение всех рекламных баннеров и интеграций.",
            Icon: BlockIcon
        },
        {
            title: "Расширенное хранилище",
            description: "Загрузка до 100 документов.",
            Icon: CloudUploadIcon
        },
        {
            title: "Эмодзи-статусы",
            description: "Выделяйтесь среди других с помощью уникальных статусов.",
            Icon: EmojiEmotionsIcon
        }
    ];

    return (
        <section className="flex items-center justify-center">

            {/* Добавляем стили для анимации прямо в компонент (можно вынести в твой CSS) */}
            <style>
                {`
                  @keyframes gradientShift {
                    0% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                    100% { background-position: 0% 50%; }
                  }
                `}
            </style>

            {/* Карточка подписки с использованием твоего класса glass-effect */}
            <div className="w-full flex flex-col gap-6 relative overflow-hidden">

                {/* Заголовок */}
                <div className="text-center z-10">
                    <h5 className="text-text-main font-bold mb-3">
                        Перейдите на <span className="text-text-brand">PRO</span> уровень
                    </h5>
                    <p className="text-small text-text-muted">
                        Получите максимум возможностей от платформы с эксклюзивными функциями.
                    </p>
                </div>

                {/* Список преимуществ */}
                <div className="flex flex-col gap-2 z-10">
                    {benefits.map((benefit, index) => (
                        <BenefitItem
                            key={index}
                            title={benefit.title}
                            description={benefit.description}
                            Icon={benefit.Icon}
                        />
                    ))}
                </div>

                {/* Кнопка покупки */}
                <div className="z-10 flex flex-col items-center">
                    <ButtonLarge
                        style={{
                            position: 'relative',
                            zIndex: 1,
                            width: '100%',
                            border: 'none',
                            color: 'white',
                            background: 'linear-gradient(135deg, #9333ea,  #0ea5e9, #06b6d4, #9333ea)', // Зацикливаем первый цвет в конце
                            backgroundSize: '300% 100%',
                            animation: 'infiniteFlow 4s linear infinite',
                            boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
                            overflow: 'hidden'
                        }}
                    >
                        <style>{`
                            @keyframes infiniteFlow {
                                0% {
                                    background-position: 150% 50%;
                                }
                                100% {
                                    background-position: 0% 50%; 
                                }
                            }
                        `}</style>
                        В разработке
                        {/*Оформить подписку 199 р/месяц*/}
                    </ButtonLarge>
                    <Button className=" !text-label !w-full !mt-2 !rounded-xl">
                        <p className="text-text-muted lowercase text-small">
                            Отменить можно в любой момент
                        </p>
                    </Button>
                </div>

            </div>
        </section>
    );
}