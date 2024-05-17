import localFont from 'next/font/local';

export const defaultInter = localFont({
    variable: '--font-inter',
    src: [
        {
            path: '../asset/font/inter/inter-bold.ttf',
            style: 'normal',
        },
        {
            path: '../asset/font/inter/inter-light.ttf',
            style: 'normal',
        },
        {
            path: '../asset/font/inter/inter-regular.ttf',
            style: 'normal',
        },
    ],
});