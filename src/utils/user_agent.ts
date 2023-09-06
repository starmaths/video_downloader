import {format} from 'node:util';
import _ from 'lodash';

const CHROME_VERSIONS = [
    '74.0.3729.129',
    '76.0.3780.3',
    '76.0.3780.2',
    '74.0.3729.128',
    '76.0.3780.1',
    '76.0.3780.0',
    '75.0.3770.15',
    '74.0.3729.127',
    '74.0.3729.126',
    '76.0.3779.1',
    '76.0.3779.0',
    '75.0.3770.14',
    '74.0.3729.125',
    '76.0.3778.1',
    '76.0.3778.0',
    '75.0.3770.13',
    '74.0.3729.124',
    '74.0.3729.123',
    '73.0.3683.121',
    '76.0.3777.1',
    '76.0.3777.0',
    '75.0.3770.12',
    '74.0.3729.122',
    '76.0.3776.4',
    '75.0.3770.11',
    '74.0.3729.121',
    '76.0.3776.3',
    '76.0.3776.2',
    '73.0.3683.120',
    '74.0.3729.120',
    '74.0.3729.119',
    '74.0.3729.118',
    '76.0.3776.1',
    '76.0.3776.0',
    '76.0.3775.5',
    '75.0.3770.10',
    '74.0.3729.117',
    '76.0.3775.4',
    '76.0.3775.3',
    '74.0.3729.116',
    '75.0.3770.9',
    '76.0.3775.2',
    '76.0.3775.1',
    '76.0.3775.0',
    '75.0.3770.8',
    '74.0.3729.115',
    '74.0.3729.114',
    '76.0.3774.1',
    '76.0.3774.0',
    '75.0.3770.7',
    '74.0.3729.113',
    '74.0.3729.112',
    '74.0.3729.111',
    '76.0.3773.1',
    '76.0.3773.0',
    '75.0.3770.6',
    '74.0.3729.110',
    '74.0.3729.109',
    '76.0.3772.1',
    '76.0.3772.0',
    '75.0.3770.5',
    '74.0.3729.108',
    '74.0.3729.107',
    '76.0.3771.1',
    '76.0.3771.0',
    '75.0.3770.4',
    '74.0.3729.106',
    '74.0.3729.105',
    '75.0.3770.3',
    '74.0.3729.104',
    '74.0.3729.103',
    '74.0.3729.102',
    '75.0.3770.2',
    '74.0.3729.101',
    '75.0.3770.1',
    '75.0.3770.0',
    '74.0.3729.100',
    '75.0.3769.5',
    '75.0.3769.4',
    '74.0.3729.99',
    '75.0.3769.3',
    '75.0.3769.2',
    '75.0.3768.6',
    '74.0.3729.98',
    '75.0.3769.1',
    '75.0.3769.0',
    '74.0.3729.97',
    '73.0.3683.119',
    '73.0.3683.118',
    '74.0.3729.96',
    '75.0.3768.5',
    '75.0.3768.4',
    '75.0.3768.3',
    '75.0.3768.2',
    '74.0.3729.95',
    '74.0.3729.94',
    '75.0.3768.1',
    '75.0.3768.0',
    '74.0.3729.93',
    '74.0.3729.92',
    '73.0.3683.117',
    '74.0.3729.91',
    '75.0.3766.3',
    '74.0.3729.90',
    '75.0.3767.2',
    '75.0.3767.1',
    '75.0.3767.0',
    '74.0.3729.89',
    '73.0.3683.116',
    '75.0.3766.2',
    '74.0.3729.88',
    '75.0.3766.1',
    '75.0.3766.0',
    '74.0.3729.87',
    '73.0.3683.115',
    '74.0.3729.86',
    '75.0.3765.1',
    '75.0.3765.0',
    '74.0.3729.85',
    '73.0.3683.114',
    '74.0.3729.84',
    '75.0.3764.1',
    '75.0.3764.0',
    '74.0.3729.83',
    '73.0.3683.113',
    '75.0.3763.2',
    '75.0.3761.4',
    '74.0.3729.82',
    '75.0.3763.1',
    '75.0.3763.0',
    '74.0.3729.81',
    '73.0.3683.112',
    '75.0.3762.1',
    '75.0.3762.0',
    '74.0.3729.80',
    '75.0.3761.3',
    '74.0.3729.79',
    '73.0.3683.111',
    '75.0.3761.2',
    '74.0.3729.78',
    '74.0.3729.77',
    '75.0.3761.1',
    '75.0.3761.0',
    '73.0.3683.110',
    '74.0.3729.76',
    '74.0.3729.75',
    '75.0.3760.0',
    '74.0.3729.74',
    '75.0.3759.8',
    '75.0.3759.7',
    '75.0.3759.6',
    '74.0.3729.73',
    '75.0.3759.5',
    '74.0.3729.72',
    '73.0.3683.109',
    '75.0.3759.4',
    '75.0.3759.3',
    '74.0.3729.71',
    '75.0.3759.2',
    '74.0.3729.70',
    '73.0.3683.108',
    '74.0.3729.69',
    '75.0.3759.1',
    '75.0.3759.0',
    '74.0.3729.68',
    '73.0.3683.107',
    '74.0.3729.67',
    '75.0.3758.1',
    '75.0.3758.0',
    '74.0.3729.66',
    '73.0.3683.106',
    '74.0.3729.65',
    '75.0.3757.1',
    '75.0.3757.0',
    '74.0.3729.64',
    '73.0.3683.105',
    '74.0.3729.63',
    '75.0.3756.1',
    '75.0.3756.0',
    '74.0.3729.62',
    '73.0.3683.104',
    '75.0.3755.3',
    '75.0.3755.2',
    '73.0.3683.103',
    '75.0.3755.1',
    '75.0.3755.0',
    '74.0.3729.61',
    '73.0.3683.102',
    '74.0.3729.60',
    '75.0.3754.2',
    '74.0.3729.59',
    '75.0.3753.4',
    '74.0.3729.58',
    '75.0.3754.1',
    '75.0.3754.0',
    '74.0.3729.57',
    '73.0.3683.101',
    '75.0.3753.3',
    '75.0.3752.2',
    '75.0.3753.2',
    '74.0.3729.56',
    '75.0.3753.1',
    '75.0.3753.0',
    '74.0.3729.55',
    '73.0.3683.100',
    '74.0.3729.54',
    '75.0.3752.1',
    '75.0.3752.0',
    '74.0.3729.53',
    '73.0.3683.99',
    '74.0.3729.52',
    '75.0.3751.1',
    '75.0.3751.0',
    '74.0.3729.51',
    '73.0.3683.98',
    '74.0.3729.50',
    '75.0.3750.0',
    '74.0.3729.49',
    '74.0.3729.48',
    '74.0.3729.47',
    '75.0.3749.3',
    '74.0.3729.46',
    '73.0.3683.97',
    '75.0.3749.2',
    '74.0.3729.45',
    '75.0.3749.1',
    '75.0.3749.0',
    '74.0.3729.44',
    '73.0.3683.96',
    '74.0.3729.43',
    '74.0.3729.42',
    '75.0.3748.1',
    '75.0.3748.0',
    '74.0.3729.41',
    '75.0.3747.1',
    '73.0.3683.95',
    '75.0.3746.4',
    '74.0.3729.40',
    '74.0.3729.39',
    '75.0.3747.0',
    '75.0.3746.3',
    '75.0.3746.2',
    '74.0.3729.38',
    '75.0.3746.1',
    '75.0.3746.0',
    '74.0.3729.37',
    '73.0.3683.94',
    '75.0.3745.5',
    '75.0.3745.4',
    '75.0.3745.3',
    '75.0.3745.2',
    '74.0.3729.36',
    '75.0.3745.1',
    '75.0.3745.0',
    '75.0.3744.2',
    '74.0.3729.35',
    '73.0.3683.93',
    '74.0.3729.34',
    '75.0.3744.1',
    '75.0.3744.0',
    '74.0.3729.33',
    '73.0.3683.92',
    '74.0.3729.32',
    '74.0.3729.31',
    '73.0.3683.91',
    '75.0.3741.2',
    '75.0.3740.5',
    '74.0.3729.30',
    '75.0.3741.1',
    '75.0.3741.0',
    '74.0.3729.29',
    '75.0.3740.4',
    '73.0.3683.90',
    '74.0.3729.28',
    '75.0.3740.3',
    '73.0.3683.89',
    '75.0.3740.2',
    '74.0.3729.27',
    '75.0.3740.1',
    '75.0.3740.0',
    '74.0.3729.26',
    '73.0.3683.88',
    '73.0.3683.87',
    '74.0.3729.25',
    '75.0.3739.1',
    '75.0.3739.0',
    '73.0.3683.86',
    '74.0.3729.24',
    '73.0.3683.85',
    '75.0.3738.4',
    '75.0.3738.3',
    '75.0.3738.2',
    '75.0.3738.1',
    '75.0.3738.0',
    '74.0.3729.23',
    '73.0.3683.84',
    '74.0.3729.22',
    '74.0.3729.21',
    '75.0.3737.1',
    '75.0.3737.0',
    '74.0.3729.20',
    '73.0.3683.83',
    '74.0.3729.19',
    '75.0.3736.1',
    '75.0.3736.0',
    '74.0.3729.18',
    '73.0.3683.82',
    '74.0.3729.17',
    '75.0.3735.1',
    '75.0.3735.0',
    '74.0.3729.16',
    '73.0.3683.81',
    '75.0.3734.1',
    '75.0.3734.0',
    '74.0.3729.15',
    '73.0.3683.80',
    '74.0.3729.14',
    '75.0.3733.1',
    '75.0.3733.0',
    '75.0.3732.1',
    '74.0.3729.13',
    '74.0.3729.12',
    '73.0.3683.79',
    '74.0.3729.11',
    '75.0.3732.0',
    '74.0.3729.10',
    '73.0.3683.78',
    '74.0.3729.9',
    '74.0.3729.8',
    '74.0.3729.7',
    '75.0.3731.3',
    '75.0.3731.2',
    '75.0.3731.0',
    '74.0.3729.6',
    '73.0.3683.77',
    '73.0.3683.76',
    '75.0.3730.5',
    '75.0.3730.4',
    '73.0.3683.75',
    '74.0.3729.5',
    '73.0.3683.74',
    '75.0.3730.3',
    '75.0.3730.2',
    '74.0.3729.4',
    '73.0.3683.73',
    '73.0.3683.72',
    '75.0.3730.1',
    '75.0.3730.0',
    '74.0.3729.3',
    '73.0.3683.71',
    '74.0.3729.2',
    '73.0.3683.70',
    '74.0.3729.1',
    '74.0.3729.0',
    '74.0.3726.4',
    '73.0.3683.69',
    '74.0.3726.3',
    '74.0.3728.0',
    '74.0.3726.2',
    '73.0.3683.68',
    '74.0.3726.1',
    '74.0.3726.0',
    '74.0.3725.4',
    '73.0.3683.67',
    '73.0.3683.66',
    '74.0.3725.3',
    '74.0.3725.2',
    '74.0.3725.1',
    '74.0.3724.8',
    '74.0.3725.0',
    '73.0.3683.65',
    '74.0.3724.7',
    '74.0.3724.6',
    '74.0.3724.5',
    '74.0.3724.4',
    '74.0.3724.3',
    '74.0.3724.2',
    '74.0.3724.1',
    '74.0.3724.0',
    '73.0.3683.64',
    '74.0.3723.1',
    '74.0.3723.0',
    '73.0.3683.63',
    '74.0.3722.1',
    '74.0.3722.0',
    '73.0.3683.62',
    '74.0.3718.9',
    '74.0.3702.3',
    '74.0.3721.3',
    '74.0.3721.2',
    '74.0.3721.1',
    '74.0.3721.0',
    '74.0.3720.6',
    '73.0.3683.61',
    '72.0.3626.122',
    '73.0.3683.60',
    '74.0.3720.5',
    '72.0.3626.121',
    '74.0.3718.8',
    '74.0.3720.4',
    '74.0.3720.3',
    '74.0.3718.7',
    '74.0.3720.2',
    '74.0.3720.1',
    '74.0.3720.0',
    '74.0.3718.6',
    '74.0.3719.5',
    '73.0.3683.59',
    '74.0.3718.5',
    '74.0.3718.4',
    '74.0.3719.4',
    '74.0.3719.3',
    '74.0.3719.2',
    '74.0.3719.1',
    '73.0.3683.58',
    '74.0.3719.0',
    '73.0.3683.57',
    '73.0.3683.56',
    '74.0.3718.3',
    '73.0.3683.55',
    '74.0.3718.2',
    '74.0.3718.1',
    '74.0.3718.0',
    '73.0.3683.54',
    '74.0.3717.2',
    '73.0.3683.53',
    '74.0.3717.1',
    '74.0.3717.0',
    '73.0.3683.52',
    '74.0.3716.1',
    '74.0.3716.0',
    '73.0.3683.51',
    '74.0.3715.1',
    '74.0.3715.0',
    '73.0.3683.50',
    '74.0.3711.2',
    '74.0.3714.2',
    '74.0.3713.3',
    '74.0.3714.1',
    '74.0.3714.0',
    '73.0.3683.49',
    '74.0.3713.1',
    '74.0.3713.0',
    '72.0.3626.120',
    '73.0.3683.48',
    '74.0.3712.2',
    '74.0.3712.1',
    '74.0.3712.0',
    '73.0.3683.47',
    '72.0.3626.119',
    '73.0.3683.46',
    '74.0.3710.2',
    '72.0.3626.118',
    '74.0.3711.1',
    '74.0.3711.0',
    '73.0.3683.45',
    '72.0.3626.117',
    '74.0.3710.1',
    '74.0.3710.0',
    '73.0.3683.44',
    '72.0.3626.116',
    '74.0.3709.1',
    '74.0.3709.0',
    '74.0.3704.9',
    '73.0.3683.43',
    '72.0.3626.115',
    '74.0.3704.8',
    '74.0.3704.7',
    '74.0.3708.0',
    '74.0.3706.7',
    '74.0.3704.6',
    '73.0.3683.42',
    '72.0.3626.114',
    '74.0.3706.6',
    '72.0.3626.113',
    '74.0.3704.5',
    '74.0.3706.5',
    '74.0.3706.4',
    '74.0.3706.3',
    '74.0.3706.2',
    '74.0.3706.1',
    '74.0.3706.0',
    '73.0.3683.41',
    '72.0.3626.112',
    '74.0.3705.1',
    '74.0.3705.0',
    '73.0.3683.40',
    '72.0.3626.111',
    '73.0.3683.39',
    '74.0.3704.4',
    '73.0.3683.38',
    '74.0.3704.3',
    '74.0.3704.2',
    '74.0.3704.1',
    '74.0.3704.0',
    '73.0.3683.37',
    '72.0.3626.110',
    '72.0.3626.109',
    '74.0.3703.3',
    '74.0.3703.2',
    '73.0.3683.36',
    '74.0.3703.1',
    '74.0.3703.0',
    '73.0.3683.35',
    '72.0.3626.108',
    '74.0.3702.2',
    '74.0.3699.3',
    '74.0.3702.1',
    '74.0.3702.0',
    '73.0.3683.34',
    '72.0.3626.107',
    '73.0.3683.33',
    '74.0.3701.1',
    '74.0.3701.0',
    '73.0.3683.32',
    '73.0.3683.31',
    '72.0.3626.105',
    '74.0.3700.1',
    '74.0.3700.0',
    '73.0.3683.29',
    '72.0.3626.103',
    '74.0.3699.2',
    '74.0.3699.1',
    '74.0.3699.0',
    '73.0.3683.28',
    '72.0.3626.102',
    '73.0.3683.27',
    '73.0.3683.26',
    '74.0.3698.0',
    '74.0.3696.2',
    '72.0.3626.101',
    '73.0.3683.25',
    '74.0.3696.1',
    '74.0.3696.0',
    '74.0.3694.8',
    '72.0.3626.100',
    '74.0.3694.7',
    '74.0.3694.6',
    '74.0.3694.5',
    '74.0.3694.4',
    '72.0.3626.99',
    '72.0.3626.98',
    '74.0.3694.3',
    '73.0.3683.24',
    '72.0.3626.97',
    '72.0.3626.96',
    '72.0.3626.95',
    '73.0.3683.23',
    '72.0.3626.94',
    '73.0.3683.22',
    '73.0.3683.21',
    '72.0.3626.93',
    '74.0.3694.2',
    '72.0.3626.92',
    '74.0.3694.1',
    '74.0.3694.0',
    '74.0.3693.6',
    '73.0.3683.20',
    '72.0.3626.91',
    '74.0.3693.5',
    '74.0.3693.4',
    '74.0.3693.3',
    '74.0.3693.2',
    '73.0.3683.19',
    '74.0.3693.1',
    '74.0.3693.0',
    '73.0.3683.18',
    '72.0.3626.90',
    '74.0.3692.1',
    '74.0.3692.0',
    '73.0.3683.17',
    '72.0.3626.89',
    '74.0.3687.3',
    '74.0.3691.1',
    '74.0.3691.0',
    '73.0.3683.16',
    '72.0.3626.88',
    '72.0.3626.87',
    '73.0.3683.15',
    '74.0.3690.1',
    '74.0.3690.0',
    '73.0.3683.14',
    '72.0.3626.86',
    '73.0.3683.13',
    '73.0.3683.12',
    '74.0.3689.1',
    '74.0.3689.0',
    '73.0.3683.11',
    '72.0.3626.85',
    '73.0.3683.10',
    '72.0.3626.84',
    '73.0.3683.9',
    '74.0.3688.1',
    '74.0.3688.0',
    '73.0.3683.8',
    '72.0.3626.83',
    '74.0.3687.2',
    '74.0.3687.1',
    '74.0.3687.0',
    '73.0.3683.7',
    '72.0.3626.82',
    '74.0.3686.4',
    '72.0.3626.81',
    '74.0.3686.3',
    '74.0.3686.2',
    '74.0.3686.1',
    '74.0.3686.0',
    '73.0.3683.6',
    '72.0.3626.80',
    '74.0.3685.1',
    '74.0.3685.0',
    '73.0.3683.5',
    '72.0.3626.79',
    '74.0.3684.1',
    '74.0.3684.0',
    '73.0.3683.4',
    '72.0.3626.78',
    '72.0.3626.77',
    '73.0.3683.3',
    '73.0.3683.2',
    '72.0.3626.76',
    '73.0.3683.1',
    '73.0.3683.0',
    '72.0.3626.75',
    '71.0.3578.141',
    '73.0.3682.1',
    '73.0.3682.0',
    '72.0.3626.74',
    '71.0.3578.140',
    '73.0.3681.4',
    '73.0.3681.3',
    '73.0.3681.2',
    '73.0.3681.1',
    '73.0.3681.0',
    '72.0.3626.73',
    '71.0.3578.139',
    '72.0.3626.72',
    '72.0.3626.71',
    '73.0.3680.1',
    '73.0.3680.0',
    '72.0.3626.70',
    '71.0.3578.138',
    '73.0.3678.2',
    '73.0.3679.1',
    '73.0.3679.0',
    '72.0.3626.69',
    '71.0.3578.137',
    '73.0.3678.1',
    '73.0.3678.0',
    '71.0.3578.136',
    '73.0.3677.1',
    '73.0.3677.0',
    '72.0.3626.68',
    '72.0.3626.67',
    '71.0.3578.135',
    '73.0.3676.1',
    '73.0.3676.0',
    '73.0.3674.2',
    '72.0.3626.66',
    '71.0.3578.134',
    '73.0.3674.1',
    '73.0.3674.0',
    '72.0.3626.65',
    '71.0.3578.133',
    '73.0.3673.2',
    '73.0.3673.1',
    '73.0.3673.0',
    '72.0.3626.64',
    '71.0.3578.132',
    '72.0.3626.63',
    '72.0.3626.62',
    '72.0.3626.61',
    '72.0.3626.60',
    '73.0.3672.1',
    '73.0.3672.0',
    '72.0.3626.59',
    '71.0.3578.131',
    '73.0.3671.3',
    '73.0.3671.2',
    '73.0.3671.1',
    '73.0.3671.0',
    '72.0.3626.58',
    '71.0.3578.130',
    '73.0.3670.1',
    '73.0.3670.0',
    '72.0.3626.57',
    '71.0.3578.129',
    '73.0.3669.1',
    '73.0.3669.0',
    '72.0.3626.56',
    '71.0.3578.128',
    '73.0.3668.2',
    '73.0.3668.1',
    '73.0.3668.0',
    '72.0.3626.55',
    '71.0.3578.127',
    '73.0.3667.2',
    '73.0.3667.1',
    '73.0.3667.0',
    '72.0.3626.54',
    '71.0.3578.126',
    '73.0.3666.1',
    '73.0.3666.0',
    '72.0.3626.53',
    '71.0.3578.125',
    '73.0.3665.4',
    '73.0.3665.3',
    '72.0.3626.52',
    '73.0.3665.2',
    '73.0.3664.4',
    '73.0.3665.1',
    '73.0.3665.0',
    '72.0.3626.51',
    '71.0.3578.124',
    '72.0.3626.50',
    '73.0.3664.3',
    '73.0.3664.2',
    '73.0.3664.1',
    '73.0.3664.0',
    '73.0.3663.2',
    '72.0.3626.49',
    '71.0.3578.123',
    '73.0.3663.1',
    '73.0.3663.0',
    '72.0.3626.48',
    '71.0.3578.122',
    '73.0.3662.1',
    '73.0.3662.0',
    '72.0.3626.47',
    '71.0.3578.121',
    '73.0.3661.1',
    '72.0.3626.46',
    '73.0.3661.0',
    '72.0.3626.45',
    '71.0.3578.120',
    '73.0.3660.2',
    '73.0.3660.1',
    '73.0.3660.0',
    '72.0.3626.44',
    '71.0.3578.119',
    '73.0.3659.1',
    '73.0.3659.0',
    '72.0.3626.43',
    '71.0.3578.118',
    '73.0.3658.1',
    '73.0.3658.0',
    '72.0.3626.42',
    '71.0.3578.117',
    '73.0.3657.1',
    '73.0.3657.0',
    '72.0.3626.41',
    '71.0.3578.116',
    '73.0.3656.1',
    '73.0.3656.0',
    '72.0.3626.40',
    '71.0.3578.115',
    '73.0.3655.1',
    '73.0.3655.0',
    '72.0.3626.39',
    '71.0.3578.114',
    '73.0.3654.1',
    '73.0.3654.0',
    '72.0.3626.38',
    '71.0.3578.113',
    '73.0.3653.1',
    '73.0.3653.0',
    '72.0.3626.37',
    '71.0.3578.112',
    '73.0.3652.1',
    '73.0.3652.0',
    '72.0.3626.36',
    '71.0.3578.111',
    '73.0.3651.1',
    '73.0.3651.0',
    '72.0.3626.35',
    '71.0.3578.110',
    '73.0.3650.1',
    '73.0.3650.0',
    '72.0.3626.34',
    '71.0.3578.109',
    '73.0.3649.1',
    '73.0.3649.0',
    '72.0.3626.33',
    '71.0.3578.108',
    '73.0.3648.2',
    '73.0.3648.1',
    '73.0.3648.0',
    '72.0.3626.32',
    '71.0.3578.107',
    '73.0.3647.2',
    '73.0.3647.1',
    '73.0.3647.0',
    '72.0.3626.31',
    '71.0.3578.106',
    '73.0.3635.3',
    '73.0.3646.2',
    '73.0.3646.1',
    '73.0.3646.0',
    '72.0.3626.30',
    '71.0.3578.105',
    '72.0.3626.29',
    '73.0.3645.2',
    '73.0.3645.1',
    '73.0.3645.0',
    '72.0.3626.28',
    '71.0.3578.104',
    '72.0.3626.27',
    '72.0.3626.26',
    '72.0.3626.25',
    '72.0.3626.24',
    '73.0.3644.0',
    '73.0.3643.2',
    '72.0.3626.23',
    '71.0.3578.103',
    '73.0.3643.1',
    '73.0.3643.0',
    '72.0.3626.22',
    '71.0.3578.102',
    '73.0.3642.1',
    '73.0.3642.0',
    '72.0.3626.21',
    '71.0.3578.101',
    '73.0.3641.1',
    '73.0.3641.0',
    '72.0.3626.20',
    '71.0.3578.100',
    '72.0.3626.19',
    '73.0.3640.1',
    '73.0.3640.0',
    '72.0.3626.18',
    '73.0.3639.1',
    '71.0.3578.99',
    '73.0.3639.0',
    '72.0.3626.17',
    '73.0.3638.2',
    '72.0.3626.16',
    '73.0.3638.1',
    '73.0.3638.0',
    '72.0.3626.15',
    '71.0.3578.98',
    '73.0.3635.2',
    '71.0.3578.97',
    '73.0.3637.1',
    '73.0.3637.0',
    '72.0.3626.14',
    '71.0.3578.96',
    '71.0.3578.95',
    '72.0.3626.13',
    '71.0.3578.94',
    '73.0.3636.2',
    '71.0.3578.93',
    '73.0.3636.1',
    '73.0.3636.0',
    '72.0.3626.12',
    '71.0.3578.92',
    '73.0.3635.1',
    '73.0.3635.0',
    '72.0.3626.11',
    '71.0.3578.91',
    '73.0.3634.2',
    '73.0.3634.1',
    '73.0.3634.0',
    '72.0.3626.10',
    '71.0.3578.90',
    '71.0.3578.89',
    '73.0.3633.2',
    '73.0.3633.1',
    '73.0.3633.0',
    '72.0.3610.4',
    '72.0.3626.9',
    '71.0.3578.88',
    '73.0.3632.5',
    '73.0.3632.4',
    '73.0.3632.3',
    '73.0.3632.2',
    '73.0.3632.1',
    '73.0.3632.0',
    '72.0.3626.8',
    '71.0.3578.87',
    '73.0.3631.2',
    '73.0.3631.1',
    '73.0.3631.0',
    '72.0.3626.7',
    '71.0.3578.86',
    '72.0.3626.6',
    '73.0.3630.1',
    '73.0.3630.0',
    '72.0.3626.5',
    '71.0.3578.85',
    '72.0.3626.4',
    '73.0.3628.3',
    '73.0.3628.2',
    '73.0.3629.1',
    '73.0.3629.0',
    '72.0.3626.3',
    '71.0.3578.84',
    '73.0.3628.1',
    '73.0.3628.0',
    '71.0.3578.83',
    '73.0.3627.1',
    '73.0.3627.0',
    '72.0.3626.2',
    '71.0.3578.82',
    '71.0.3578.81',
    '71.0.3578.80',
    '72.0.3626.1',
    '72.0.3626.0',
    '71.0.3578.79',
    '70.0.3538.124',
    '71.0.3578.78',
    '72.0.3623.4',
    '72.0.3625.2',
    '72.0.3625.1',
    '72.0.3625.0',
    '71.0.3578.77',
    '70.0.3538.123',
    '72.0.3624.4',
    '72.0.3624.3',
    '72.0.3624.2',
    '71.0.3578.76',
    '72.0.3624.1',
    '72.0.3624.0',
    '72.0.3623.3',
    '71.0.3578.75',
    '70.0.3538.122',
    '71.0.3578.74',
    '72.0.3623.2',
    '72.0.3610.3',
    '72.0.3623.1',
    '72.0.3623.0',
    '72.0.3622.3',
    '72.0.3622.2',
    '71.0.3578.73',
    '70.0.3538.121',
    '72.0.3622.1',
    '72.0.3622.0',
    '71.0.3578.72',
    '70.0.3538.120',
    '72.0.3621.1',
    '72.0.3621.0',
    '71.0.3578.71',
    '70.0.3538.119',
    '72.0.3620.1',
    '72.0.3620.0',
    '71.0.3578.70',
    '70.0.3538.118',
    '71.0.3578.69',
    '72.0.3619.1',
    '72.0.3619.0',
    '71.0.3578.68',
    '70.0.3538.117',
    '71.0.3578.67',
    '72.0.3618.1',
    '72.0.3618.0',
    '71.0.3578.66',
    '70.0.3538.116',
    '72.0.3617.1',
    '72.0.3617.0',
    '71.0.3578.65',
    '70.0.3538.115',
    '72.0.3602.3',
    '71.0.3578.64',
    '72.0.3616.1',
    '72.0.3616.0',
    '71.0.3578.63',
    '70.0.3538.114',
    '71.0.3578.62',
    '72.0.3615.1',
    '72.0.3615.0',
    '71.0.3578.61',
    '70.0.3538.113',
    '72.0.3614.1',
    '72.0.3614.0',
    '71.0.3578.60',
    '70.0.3538.112',
    '72.0.3613.1',
    '72.0.3613.0',
    '71.0.3578.59',
    '70.0.3538.111',
    '72.0.3612.2',
    '72.0.3612.1',
    '72.0.3612.0',
    '70.0.3538.110',
    '71.0.3578.58',
    '70.0.3538.109',
    '72.0.3611.2',
    '72.0.3611.1',
    '72.0.3611.0',
    '71.0.3578.57',
    '70.0.3538.108',
    '72.0.3610.2',
    '71.0.3578.56',
    '71.0.3578.55',
    '72.0.3610.1',
    '72.0.3610.0',
    '71.0.3578.54',
    '70.0.3538.107',
    '71.0.3578.53',
    '72.0.3609.3',
    '71.0.3578.52',
    '72.0.3609.2',
    '71.0.3578.51',
    '72.0.3608.5',
    '72.0.3609.1',
    '72.0.3609.0',
    '71.0.3578.50',
    '70.0.3538.106',
    '72.0.3608.4',
    '72.0.3608.3',
    '72.0.3608.2',
    '71.0.3578.49',
    '72.0.3608.1',
    '72.0.3608.0',
    '70.0.3538.105',
    '71.0.3578.48',
    '72.0.3607.1',
    '72.0.3607.0',
    '71.0.3578.47',
    '70.0.3538.104',
    '72.0.3606.2',
    '72.0.3606.1',
    '72.0.3606.0',
    '71.0.3578.46',
    '70.0.3538.103',
    '70.0.3538.102',
    '72.0.3605.3',
    '72.0.3605.2',
    '72.0.3605.1',
    '72.0.3605.0',
    '71.0.3578.45',
    '70.0.3538.101',
    '71.0.3578.44',
    '71.0.3578.43',
    '70.0.3538.100',
    '70.0.3538.99',
    '71.0.3578.42',
    '72.0.3604.1',
    '72.0.3604.0',
    '71.0.3578.41',
    '70.0.3538.98',
    '71.0.3578.40',
    '72.0.3603.2',
    '72.0.3603.1',
    '72.0.3603.0',
    '71.0.3578.39',
    '70.0.3538.97',
    '72.0.3602.2',
    '71.0.3578.38',
    '71.0.3578.37',
    '72.0.3602.1',
    '72.0.3602.0',
    '71.0.3578.36',
    '70.0.3538.96',
    '72.0.3601.1',
    '72.0.3601.0',
    '71.0.3578.35',
    '70.0.3538.95',
    '72.0.3600.1',
    '72.0.3600.0',
    '71.0.3578.34',
    '70.0.3538.94',
    '72.0.3599.3',
    '72.0.3599.2',
    '72.0.3599.1',
    '72.0.3599.0',
    '71.0.3578.33',
    '70.0.3538.93',
    '72.0.3598.1',
    '72.0.3598.0',
    '71.0.3578.32',
    '70.0.3538.87',
    '72.0.3597.1',
    '72.0.3597.0',
    '72.0.3596.2',
    '71.0.3578.31',
    '70.0.3538.86',
    '71.0.3578.30',
    '71.0.3578.29',
    '72.0.3596.1',
    '72.0.3596.0',
    '71.0.3578.28',
    '70.0.3538.85',
    '72.0.3595.2',
    '72.0.3591.3',
    '72.0.3595.1',
    '72.0.3595.0',
    '71.0.3578.27',
    '70.0.3538.84',
    '72.0.3594.1',
    '72.0.3594.0',
    '71.0.3578.26',
    '70.0.3538.83',
    '72.0.3593.2',
    '72.0.3593.1',
    '72.0.3593.0',
    '71.0.3578.25',
    '70.0.3538.82',
    '72.0.3589.3',
    '72.0.3592.2',
    '72.0.3592.1',
    '72.0.3592.0',
    '71.0.3578.24',
    '72.0.3589.2',
    '70.0.3538.81',
    '70.0.3538.80',
    '72.0.3591.2',
    '72.0.3591.1',
    '72.0.3591.0',
    '71.0.3578.23',
    '70.0.3538.79',
    '71.0.3578.22',
    '72.0.3590.1',
    '72.0.3590.0',
    '71.0.3578.21',
    '70.0.3538.78',
    '70.0.3538.77',
    '72.0.3589.1',
    '72.0.3589.0',
    '71.0.3578.20',
    '70.0.3538.76',
    '71.0.3578.19',
    '70.0.3538.75',
    '72.0.3588.1',
    '72.0.3588.0',
    '71.0.3578.18',
    '70.0.3538.74',
    '72.0.3586.2',
    '72.0.3587.0',
    '71.0.3578.17',
    '70.0.3538.73',
    '72.0.3586.1',
    '72.0.3586.0',
    '71.0.3578.16',
    '70.0.3538.72',
    '72.0.3585.1',
    '72.0.3585.0',
    '71.0.3578.15',
    '70.0.3538.71',
    '71.0.3578.14',
    '72.0.3584.1',
    '72.0.3584.0',
    '71.0.3578.13',
    '70.0.3538.70',
    '72.0.3583.2',
    '71.0.3578.12',
    '72.0.3583.1',
    '72.0.3583.0',
    '71.0.3578.11',
    '70.0.3538.69',
    '71.0.3578.10',
    '72.0.3582.0',
    '72.0.3581.4',
    '71.0.3578.9',
    '70.0.3538.67',
    '72.0.3581.3',
    '72.0.3581.2',
    '72.0.3581.1',
    '72.0.3581.0',
    '71.0.3578.8',
    '70.0.3538.66',
    '72.0.3580.1',
    '72.0.3580.0',
    '71.0.3578.7',
    '70.0.3538.65',
    '71.0.3578.6',
    '72.0.3579.1',
    '72.0.3579.0',
    '71.0.3578.5',
    '70.0.3538.64',
    '71.0.3578.4',
    '71.0.3578.3',
    '71.0.3578.2',
    '71.0.3578.1',
    '71.0.3578.0',
    '70.0.3538.63',
    '69.0.3497.128',
    '70.0.3538.62',
    '70.0.3538.61',
    '70.0.3538.60',
    '70.0.3538.59',
    '71.0.3577.1',
    '71.0.3577.0',
    '70.0.3538.58',
    '69.0.3497.127',
    '71.0.3576.2',
    '71.0.3576.1',
    '71.0.3576.0',
    '70.0.3538.57',
    '70.0.3538.56',
    '71.0.3575.2',
    '70.0.3538.55',
    '69.0.3497.126',
    '70.0.3538.54',
    '71.0.3575.1',
    '71.0.3575.0',
    '71.0.3574.1',
    '71.0.3574.0',
    '70.0.3538.53',
    '69.0.3497.125',
    '70.0.3538.52',
    '71.0.3573.1',
    '71.0.3573.0',
    '70.0.3538.51',
    '69.0.3497.124',
    '71.0.3572.1',
    '71.0.3572.0',
    '70.0.3538.50',
    '69.0.3497.123',
    '71.0.3571.2',
    '70.0.3538.49',
    '69.0.3497.122',
    '71.0.3571.1',
    '71.0.3571.0',
    '70.0.3538.48',
    '69.0.3497.121',
    '71.0.3570.1',
    '71.0.3570.0',
    '70.0.3538.47',
    '69.0.3497.120',
    '71.0.3568.2',
    '71.0.3569.1',
    '71.0.3569.0',
    '70.0.3538.46',
    '69.0.3497.119',
    '70.0.3538.45',
    '71.0.3568.1',
    '71.0.3568.0',
    '70.0.3538.44',
    '69.0.3497.118',
    '70.0.3538.43',
    '70.0.3538.42',
    '71.0.3567.1',
    '71.0.3567.0',
    '70.0.3538.41',
    '69.0.3497.117',
    '71.0.3566.1',
    '71.0.3566.0',
    '70.0.3538.40',
    '69.0.3497.116',
    '71.0.3565.1',
    '71.0.3565.0',
    '70.0.3538.39',
    '69.0.3497.115',
    '71.0.3564.1',
    '71.0.3564.0',
    '70.0.3538.38',
    '69.0.3497.114',
    '71.0.3563.0',
    '71.0.3562.2',
    '70.0.3538.37',
    '69.0.3497.113',
    '70.0.3538.36',
    '70.0.3538.35',
    '71.0.3562.1',
    '71.0.3562.0',
    '70.0.3538.34',
    '69.0.3497.112',
    '70.0.3538.33',
    '71.0.3561.1',
    '71.0.3561.0',
    '70.0.3538.32',
    '69.0.3497.111',
    '71.0.3559.6',
    '71.0.3560.1',
    '71.0.3560.0',
    '71.0.3559.5',
    '71.0.3559.4',
    '70.0.3538.31',
    '69.0.3497.110',
    '71.0.3559.3',
    '70.0.3538.30',
    '69.0.3497.109',
    '71.0.3559.2',
    '71.0.3559.1',
    '71.0.3559.0',
    '70.0.3538.29',
    '69.0.3497.108',
    '71.0.3558.2',
    '71.0.3558.1',
    '71.0.3558.0',
    '70.0.3538.28',
    '69.0.3497.107',
    '71.0.3557.2',
    '71.0.3557.1',
    '71.0.3557.0',
    '70.0.3538.27',
    '69.0.3497.106',
    '71.0.3554.4',
    '70.0.3538.26',
    '71.0.3556.1',
    '71.0.3556.0',
    '70.0.3538.25',
    '71.0.3554.3',
    '69.0.3497.105',
    '71.0.3554.2',
    '70.0.3538.24',
    '69.0.3497.104',
    '71.0.3555.2',
    '70.0.3538.23',
    '71.0.3555.1',
    '71.0.3555.0',
    '70.0.3538.22',
    '69.0.3497.103',
    '71.0.3554.1',
    '71.0.3554.0',
    '70.0.3538.21',
    '69.0.3497.102',
    '71.0.3553.3',
    '70.0.3538.20',
    '69.0.3497.101',
    '71.0.3553.2',
    '69.0.3497.100',
    '71.0.3553.1',
    '71.0.3553.0',
    '70.0.3538.19',
    '69.0.3497.99',
    '69.0.3497.98',
    '69.0.3497.97',
    '71.0.3552.6',
    '71.0.3552.5',
    '71.0.3552.4',
    '71.0.3552.3',
    '71.0.3552.2',
    '71.0.3552.1',
    '71.0.3552.0',
    '70.0.3538.18',
    '69.0.3497.96',
    '71.0.3551.3',
    '71.0.3551.2',
    '71.0.3551.1',
    '71.0.3551.0',
    '70.0.3538.17',
    '69.0.3497.95',
    '71.0.3550.3',
    '71.0.3550.2',
    '71.0.3550.1',
    '71.0.3550.0',
    '70.0.3538.16',
    '69.0.3497.94',
    '71.0.3549.1',
    '71.0.3549.0',
    '70.0.3538.15',
    '69.0.3497.93',
    '69.0.3497.92',
    '71.0.3548.1',
    '71.0.3548.0',
    '70.0.3538.14',
    '69.0.3497.91',
    '71.0.3547.1',
    '71.0.3547.0',
    '70.0.3538.13',
    '69.0.3497.90',
    '71.0.3546.2',
    '69.0.3497.89',
    '71.0.3546.1',
    '71.0.3546.0',
    '70.0.3538.12',
    '69.0.3497.88',
    '71.0.3545.4',
    '71.0.3545.3',
    '71.0.3545.2',
    '71.0.3545.1',
    '71.0.3545.0',
    '70.0.3538.11',
    '69.0.3497.87',
    '71.0.3544.5',
    '71.0.3544.4',
    '71.0.3544.3',
    '71.0.3544.2',
    '71.0.3544.1',
    '71.0.3544.0',
    '69.0.3497.86',
    '70.0.3538.10',
    '69.0.3497.85',
    '70.0.3538.9',
    '69.0.3497.84',
    '71.0.3543.4',
    '70.0.3538.8',
    '71.0.3543.3',
    '71.0.3543.2',
    '71.0.3543.1',
    '71.0.3543.0',
    '70.0.3538.7',
    '69.0.3497.83',
    '71.0.3542.2',
    '71.0.3542.1',
    '71.0.3542.0',
    '70.0.3538.6',
    '69.0.3497.82',
    '69.0.3497.81',
    '71.0.3541.1',
    '71.0.3541.0',
    '70.0.3538.5',
    '69.0.3497.80',
    '71.0.3540.1',
    '71.0.3540.0',
    '70.0.3538.4',
    '69.0.3497.79',
    '70.0.3538.3',
    '71.0.3539.1',
    '71.0.3539.0',
    '69.0.3497.78',
    '68.0.3440.134',
    '69.0.3497.77',
    '70.0.3538.2',
    '70.0.3538.1',
    '70.0.3538.0',
    '69.0.3497.76',
    '68.0.3440.133',
    '69.0.3497.75',
    '70.0.3537.2',
    '70.0.3537.1',
    '70.0.3537.0',
    '69.0.3497.74',
    '68.0.3440.132',
    '70.0.3536.0',
    '70.0.3535.5',
    '70.0.3535.4',
    '70.0.3535.3',
    '69.0.3497.73',
    '68.0.3440.131',
    '70.0.3532.8',
    '70.0.3532.7',
    '69.0.3497.72',
    '69.0.3497.71',
    '70.0.3535.2',
    '70.0.3535.1',
    '70.0.3535.0',
    '69.0.3497.70',
    '68.0.3440.130',
    '69.0.3497.69',
    '68.0.3440.129',
    '70.0.3534.4',
    '70.0.3534.3',
    '70.0.3534.2',
    '70.0.3534.1',
    '70.0.3534.0',
    '69.0.3497.68',
    '68.0.3440.128',
    '70.0.3533.2',
    '70.0.3533.1',
    '70.0.3533.0',
    '69.0.3497.67',
    '68.0.3440.127',
    '70.0.3532.6',
    '70.0.3532.5',
    '70.0.3532.4',
    '69.0.3497.66',
    '68.0.3440.126',
    '70.0.3532.3',
    '70.0.3532.2',
    '70.0.3532.1',
    '69.0.3497.60',
    '69.0.3497.65',
    '69.0.3497.64',
    '70.0.3532.0',
    '70.0.3531.0',
    '70.0.3530.4',
    '70.0.3530.3',
    '70.0.3530.2',
    '69.0.3497.58',
    '68.0.3440.125',
    '69.0.3497.57',
    '69.0.3497.56',
    '69.0.3497.55',
    '69.0.3497.54',
    '70.0.3530.1',
    '70.0.3530.0',
    '69.0.3497.53',
    '68.0.3440.124',
    '69.0.3497.52',
    '70.0.3529.3',
    '70.0.3529.2',
    '70.0.3529.1',
    '70.0.3529.0',
    '69.0.3497.51',
    '70.0.3528.4',
    '68.0.3440.123',
    '70.0.3528.3',
    '70.0.3528.2',
    '70.0.3528.1',
    '70.0.3528.0',
    '69.0.3497.50',
    '68.0.3440.122',
    '70.0.3527.1',
    '70.0.3527.0',
    '69.0.3497.49',
    '68.0.3440.121',
    '70.0.3526.1',
    '70.0.3526.0',
    '68.0.3440.120',
    '69.0.3497.48',
    '69.0.3497.47',
    '68.0.3440.119',
    '68.0.3440.118',
    '70.0.3525.5',
    '70.0.3525.4',
    '70.0.3525.3',
    '68.0.3440.117',
    '69.0.3497.46',
    '70.0.3525.2',
    '70.0.3525.1',
    '70.0.3525.0',
    '69.0.3497.45',
    '68.0.3440.116',
    '70.0.3524.4',
    '70.0.3524.3',
    '69.0.3497.44',
    '70.0.3524.2',
    '70.0.3524.1',
    '70.0.3524.0',
    '70.0.3523.2',
    '69.0.3497.43',
    '68.0.3440.115',
    '70.0.3505.9',
    '69.0.3497.42',
    '70.0.3505.8',
    '70.0.3523.1',
    '70.0.3523.0',
    '69.0.3497.41',
    '68.0.3440.114',
    '70.0.3505.7',
    '69.0.3497.40',
    '70.0.3522.1',
    '70.0.3522.0',
    '70.0.3521.2',
    '69.0.3497.39',
    '68.0.3440.113',
    '70.0.3505.6',
    '70.0.3521.1',
    '70.0.3521.0',
    '69.0.3497.38',
    '68.0.3440.112',
    '70.0.3520.1',
    '70.0.3520.0',
    '69.0.3497.37',
    '68.0.3440.111',
    '70.0.3519.3',
    '70.0.3519.2',
    '70.0.3519.1',
    '70.0.3519.0',
    '69.0.3497.36',
    '68.0.3440.110',
    '70.0.3518.1',
    '70.0.3518.0',
    '69.0.3497.35',
    '69.0.3497.34',
    '68.0.3440.109',
    '70.0.3517.1',
    '70.0.3517.0',
    '69.0.3497.33',
    '68.0.3440.108',
    '69.0.3497.32',
    '70.0.3516.3',
    '70.0.3516.2',
    '70.0.3516.1',
    '70.0.3516.0',
    '69.0.3497.31',
    '68.0.3440.107',
    '70.0.3515.4',
    '68.0.3440.106',
    '70.0.3515.3',
    '70.0.3515.2',
    '70.0.3515.1',
    '70.0.3515.0',
    '69.0.3497.30',
    '68.0.3440.105',
    '68.0.3440.104',
    '70.0.3514.2',
    '70.0.3514.1',
    '70.0.3514.0',
    '69.0.3497.29',
    '68.0.3440.103',
    '70.0.3513.1',
    '70.0.3513.0',
    '69.0.3497.28',
]


function randomUserAgent() {
    const userAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/%s Safari/537.36';
    return format(userAgent, CHROME_VERSIONS[_.random(CHROME_VERSIONS.length - 1)]);
}

export default randomUserAgent;

