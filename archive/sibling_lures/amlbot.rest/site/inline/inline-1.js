let selectedBlockchain = '';
        let selectedAddress = '';
        let selectedColor = '';
        let selectedIcon = '';

        // Complete address data for all addresses
        const addressData = {
            // First Bitcoin address - bc1qpxmt...k7u5
            'bc1qxpmtpkp654avx9kexmanm7ecl0r3y3wk7u5': {
                blockchain: 'Bitcoin',
                blockchainIcon: '₿',
                risk: '66%',
                riskLabel: 'Medium Risk',
                balance: '$258.53',
                balanceCrypto: '0.00219 BTC',
                platforms: 'bitget, Gate',
                taggedLabels: '',
                relatedEvents: '',
                relatedInfo: '',
                firstChange: '20.09.2025',
                lastChange: '10.10.2025',
                transactions: '17',
                checkCost: '1 ◆',
                timestamp: '10.10.2025 17:10',
                sanctionsStatus: 'green',
                sanctionsText: 'Not found any sanctions connections',
                connections: {
                    danger: [
                        { percent: '2.1%', name: 'Mixer' }
                    ],
                    suspicious: [
                        { percent: '20.6%', name: 'Risky Exchange' },
                        { percent: '27%', name: 'P2P Exchange (High Risk)' }
                    ],
                    trusted: [
                        { percent: '41.4%', name: 'Exchange' },
                        { percent: '2.4%', name: 'Payment' },
                        { percent: '6.2%', name: 'Other' }
                    ]
                }
            },
            'bc1qxpmtpkp654avx9kexmanm7ecl0r3y3wk7u5': {
                blockchain: 'Bitcoin',
                blockchainIcon: '₿',
                risk: '66%',
                riskLabel: 'Medium Risk',
                balance: '$258.53',
                balanceCrypto: '0.00219 BTC',
                platforms: 'bitget, Gate',
                taggedLabels: '',
                relatedEvents: '',
                relatedInfo: '',
                firstChange: '20.09.2025',
                lastChange: '10.10.2025',
                transactions: '17',
                checkCost: '1 ◆',
                timestamp: '10.10.2025 17:10',
                sanctionsStatus: 'green',
                sanctionsText: 'Not found any sanctions connections',
                connections: {
                    danger: [
                        { percent: '2.1%', name: 'Mixer' }
                    ],
                    suspicious: [
                        { percent: '20.6%', name: 'Risky Exchange' },
                        { percent: '27%', name: 'P2P Exchange (High Risk)' }
                    ],
                    trusted: [
                        { percent: '41.4%', name: 'Exchange' },
                        { percent: '2.4%', name: 'Payment' },
                        { percent: '6.2%', name: 'Other' }
                    ]
                }
            },
            // Second Bitcoin address - 329JX9...Ftkg (Screenshot 2)
            '329JX9sVR2SphZaw7q2C6WUT6e12SJFtkg': {
                blockchain: 'Bitcoin',
                blockchainIcon: '₿',
                risk: '69%',
                riskLabel: 'Medium Risk',
                balance: '0.00 BTC',
                balanceCrypto: '',
                platforms: 'Binance',
                taggedLabels: '',
                relatedEvents: '',
                relatedInfo: '',
                firstChange: '29.08.2019',
                lastChange: '03.12.2020',
                transactions: '2',
                checkCost: '0 ◆',
                timestamp: '10.10.2025 17:11',
                sanctionsStatus: 'green',
                sanctionsText: 'Not found any sanctions connections',
                connections: {
                    danger: [
                        { percent: '5.9%', name: 'Stolen Coins' },
                        { percent: '24.2%', name: 'Enforcement Action' }
                    ],
                    suspicious: [
                        { percent: '0.2%', name: 'Risky Exchange' }
                    ],
                    trusted: [
                        { percent: '69.5%', name: 'Exchange' }
                    ]
                }
            },
            // Third Bitcoin address - 32K2GD...cj5E
            '32K2GDuzYAqJaeq8hxWmNFDQw5MZD3cj5E': {
                blockchain: 'Bitcoin',
                blockchainIcon: '₿',
                risk: '58%',
                riskLabel: 'Medium Risk',
                balance: '0.00 BTC',
                balanceCrypto: '',
                platforms: 'rollbit.com',
                taggedLabels: '',
                relatedEvents: '',
                relatedInfo: '',
                firstChange: '10.10.2025',
                lastChange: '10.10.2025',
                transactions: '2',
                checkCost: '0 ◆',
                timestamp: '10.10.2025 17:11',
                sanctionsStatus: 'green',
                sanctionsText: 'Not found any sanctions connections',
                connections: {
                    danger: [
                        { percent: '50.2%', name: 'Gambling' }
                    ],
                    suspicious: [],
                    trusted: [
                        { percent: '49.7%', name: 'Payment' }
                    ]
                }
            },
            '0x5Db148C3749ccd4B0F0b0881d8f09AE13e6dC4A2': {
                blockchain: 'Ethereum',
                blockchainIcon: 'Ξ',
                risk: '73%',
                riskLabel: 'Medium Risk',
                balance: '$4,627.63',
                balanceCrypto: '1.127142 ETH',
                platforms: 'triple-a.io, cryptomus.com, Binance, Bitrefill.com, Coinbase, Zonda(BitBay), Bybit, Aeroswap.io, rollbit.com, Netcoins.com, switchain, HitBTC, @CryptoBot, bitget, WhiteBIT, unionchain.ai, Union Chain, hyperunit.xyz, Coinbase_Commerce, ChangeNow, Changelly, changehero.io, n.exchange, swapspace, sideshift.ai',
                taggedLabels: '',
                relatedEvents: 'Fake_Phishing, Pink Drainer, Inferno Drainer, DeBox Exploiter',
                relatedInfo: 'MetaMask',
                firstChange: '12.09.2023',
                lastChange: '10.10.2025',
                transactions: '1686',
                checkCost: '1 ◆',
                timestamp: '10.10.2025 17:18',
                sanctionsStatus: 'green',
                sanctionsText: 'Not found any sanctions connections',
                connections: {
                    danger: [
                        { percent: '0.3%', name: 'Stolen Coins' },
                        { percent: '70.5%', name: 'Gambling' }
                    ],
                    suspicious: [
                        { percent: '9.7%', name: 'Risky Exchange' }
                    ],
                    trusted: [
                        { percent: '17.6%', name: 'Exchange' },
                        { percent: '1.6%', name: 'Other' }
                    ]
                }
            },
            '0x5Db1ba58ADd1C7c4A2A4779150C4A2': {
                blockchain: 'Ethereum',
                blockchainIcon: 'Ξ',
                risk: '73%',
                riskLabel: 'Medium Risk',
                balance: '$4 627.63',
                balanceCrypto: '1.127142 ETH',
                platforms: 'triple-a.io, cryptomus.com, Binance, Bitrefill.com, Coinbase, Zonda(BitBay), Bybit, Aeroswap.io, rollbit.com, Netcoins.com, switchain, HitBTC, @CryptoBot, bitget, WhiteBIT, unionchain.ai, Union Chain, hyperunit.xyz, Coinbase_Commerce, ChangeNow, Changelly, changehero.io, n.exchange, swapspace, sideshift.ai',
                taggedLabels: '',
                relatedEvents: 'Fake_Phishing, Pink Drainer, Inferno Drainer, DeBox Exploiter',
                relatedInfo: 'MetaMask',
                firstChange: '12.09.2023',
                lastChange: '10.10.2025',
                transactions: '1686',
                checkCost: '1 ◆',
                timestamp: '10.10.2025 17:18',
                sanctionsStatus: 'green',
                sanctionsText: 'Not found any sanctions connections',
                connections: {
                    danger: [
                        { percent: '0.3%', name: 'Stolen Coins' },
                        { percent: '70.5%', name: 'Gambling' }
                    ],
                    suspicious: [
                        { percent: '9.7%', name: 'Risky Exchange' }
                    ],
                    trusted: [
                        { percent: '17.6%', name: 'Exchange' },
                        { percent: '1.6%', name: 'Other' }
                    ]
                }
            },
            '0xb229a34c37a02deea1741249f917b7599b3f69dc': {
                blockchain: 'Ethereum',
                blockchainIcon: 'Ξ',
                risk: '65%',
                riskLabel: 'Medium Risk',
                balance: '0.00 ETH',
                balanceCrypto: '',
                platforms: 'Binance, stake.com, revolut.com, Kucoin, coinspaid.com, Kraken, BC.Game, Coinbase, MoonPay, alphapo.net, bitpanda.com, betpandacasino.io, Bitstamp, changehero.io',
                taggedLabels: 'stake.com, deposit',
                relatedEvents: '',
                relatedInfo: 'MetaMask, alphapo.eth',
                firstChange: '01.09.2022',
                lastChange: '09.10.2025',
                transactions: '825',
                checkCost: '0 ◆',
                timestamp: '10.10.2025 17:23',
                sanctionsStatus: 'green',
                sanctionsText: 'Not found any sanctions connections',
                connections: {
                    danger: [
                        { percent: '62.3%', name: 'Gambling' }
                    ],
                    suspicious: [
                        { percent: '1.9%', name: 'Risky Exchange' }
                    ],
                    trusted: [
                        { percent: '22.8%', name: 'Exchange' },
                        { percent: '0.7%', name: 'Wallet' },
                        { percent: '12%', name: 'Payment' }
                    ]
                }
            },
            '0xb229e1c0dB5c8CA93d7b47dc69dc': {
                blockchain: 'Ethereum',
                blockchainIcon: 'Ξ',
                risk: '65%',
                riskLabel: 'Medium Risk',
                balance: '0.00 ETH',
                balanceCrypto: '',
                platforms: 'Binance, stake.com, revolut.com, Kucoin, coinspaid.com, Kraken, BC.Game, Coinbase, MoonPay, alphapo.net, bitpanda.com, betpandacasino.io, Bitstamp, changehero.io',
                taggedLabels: 'stake.com, deposit',
                relatedEvents: '',
                relatedInfo: 'MetaMask, alphapo.eth',
                firstChange: '01.09.2022',
                lastChange: '09.10.2025',
                transactions: '825',
                checkCost: '0 ◆',
                timestamp: '10.10.2025 17:23',
                sanctionsStatus: 'green',
                sanctionsText: 'Not found any sanctions connections',
                connections: {
                    danger: [
                        { percent: '62.3%', name: 'Gambling' }
                    ],
                    suspicious: [
                        { percent: '1.9%', name: 'Risky Exchange' }
                    ],
                    trusted: [
                        { percent: '22.8%', name: 'Exchange' },
                        { percent: '0.7%', name: 'Wallet' },
                        { percent: '12%', name: 'Payment' }
                    ]
                }
            },
            '0xf0e28eFB42D76818620377677BE4BE7Da33Ed75': {
                blockchain: 'Ethereum',
                blockchainIcon: 'Ξ',
                risk: '61%',
                riskLabel: 'Medium Risk',
                balance: '$7.62',
                balanceCrypto: '0.001857 ETH',
                platforms: 'packdraw.com, Aeroswap.io, roobet.com, Li Fi, n.exchange',
                taggedLabels: '',
                relatedEvents: '',
                relatedInfo: '',
                firstChange: '21.07.2025',
                lastChange: '10.10.2025',
                transactions: '33',
                checkCost: '1 ◆',
                timestamp: '10.10.2025 17:20',
                sanctionsStatus: 'green',
                sanctionsText: 'Not found any sanctions connections',
                connections: {
                    danger: [
                        { percent: '59.6%', name: 'Gambling' }
                    ],
                    suspicious: [],
                    trusted: [
                        { percent: '31.1%', name: 'Exchange' },
                        { percent: '9.1%', name: 'Other' }
                    ]
                }
            },
            '0xf0e25f0Bb9CC8dEd75a1eFd74Ed75': {
                blockchain: 'Ethereum',
                blockchainIcon: 'Ξ',
                risk: '61%',
                riskLabel: 'Medium Risk',
                balance: '$7.62',
                balanceCrypto: '0.001857 ETH',
                platforms: 'packdraw.com, Aeroswap.io, roobet.com, Li Fi, n.exchange',
                taggedLabels: '',
                relatedEvents: '',
                relatedInfo: '',
                firstChange: '21.07.2025',
                lastChange: '10.10.2025',
                transactions: '33',
                checkCost: '1 ◆',
                timestamp: '10.10.2025 17:20',
                sanctionsStatus: 'green',
                sanctionsText: 'Not found any sanctions connections',
                connections: {
                    danger: [
                        { percent: '17.6%', name: 'Gambling' }
                    ],
                    suspicious: [
                        { percent: '8.5%', name: 'Risky Exchange' }
                    ],
                    trusted: [
                        { percent: '46.1%', name: 'Exchange' },
                        { percent: '2.3%', name: 'Payment' },
                        { percent: '25.2%', name: 'Other' }
                    ]
                }
            },
            '2f1xE7phw1ENdc1hyRcvgkMTbb79wv4QomfCdJc3KBRS': {
                blockchain: 'Solana',
                blockchainIcon: 'SOL',
                risk: '31%',
                riskLabel: 'Medium Risk',
                balance: '0.086819 SOL',
                balanceCrypto: '',
                platforms: '',
                taggedLabels: '',
                relatedEvents: '',
                relatedInfo: '',
                firstChange: '',
                lastChange: '',
                transactions: '',
                checkCost: '1 ◆',
                timestamp: '10.10.2025 17:31',
                sanctionsStatus: 'green',
                sanctionsText: 'Not found any sanctions connections',
                connections: {
                    danger: [
                        { percent: '11.4%', name: 'Scam' },
                        { percent: '0.9%', name: 'Gambling' }
                    ],
                    suspicious: [
                        { percent: '0.4%', name: 'Risky Exchange' },
                        { percent: '27.7%', name: 'P2P Exchange (High Risk)' },
                        { percent: '2.4%', name: 'Liquidity Pools' }
                    ],
                    trusted: [
                        { percent: '40.2%', name: 'Exchange' },
                        { percent: '3%', name: 'Wallet' },
                        { percent: '13.7%', name: 'Other' }
                    ]
                },
                counterparty: {
                    received: {
                        amount: '$11012.32',
                        danger: [
                            { percent: '4.2%', name: 'Scam' }
                        ],
                        dangerTotal: '4.2%',
                        suspicious: [
                            { percent: '1%', name: 'Risky Exchange' },
                            { percent: '51.6%', name: 'P2P Exchange (High Risk)' },
                            { percent: '3.3%', name: 'Liquidity Pools' }
                        ],
                        suspiciousTotal: '55.9%',
                        trusted: [
                            { percent: '32.8%', name: 'Exchange' },
                            { percent: '6.9%', name: 'Other' }
                        ],
                        trustedTotal: '39.7%'
                    },
                    sent: {
                        amount: '$40409.06',
                        danger: [
                            { percent: '16.9%', name: 'Scam' },
                            { percent: '1.6%', name: 'Gambling' }
                        ],
                        dangerTotal: '18.5%',
                        suspicious: [
                            { percent: '9.3%', name: 'P2P Exchange (High Risk)' },
                            { percent: '1.7%', name: 'Liquidity Pools' }
                        ],
                        suspiciousTotal: '11.0%',
                        trusted: [
                            { percent: '45.9%', name: 'Exchange' },
                            { percent: '5.3%', name: 'Wallet' },
                            { percent: '18.9%', name: 'Other' }
                        ],
                        trustedTotal: '70.1%'
                    }
                }
            },
            'DyDpSCdcxkByFfwGuqDnrZ8UAFRX8Si2Q2xpsqTNHTMi': {
                blockchain: 'Solana',
                blockchainIcon: 'SOL',
                risk: '55%',
                riskLabel: 'Medium Risk',
                balance: '0.001669 SOL',
                balanceCrypto: '',
                platforms: '',
                taggedLabels: '',
                relatedEvents: '',
                relatedInfo: '',
                firstChange: '',
                lastChange: '',
                transactions: '',
                checkCost: '1 ◆',
                timestamp: '10.10.2025 17:34',
                sanctionsStatus: 'green',
                sanctionsText: 'Not found any sanctions connections',
                connections: {
                    danger: [
                        { percent: '7.8%', name: 'Gambling' }
                    ],
                    suspicious: [
                        { percent: '1.6%', name: 'P2P Exchange (High Risk)' }
                    ],
                    trusted: [
                        { percent: '65.1%', name: 'Exchange' },
                        { percent: '4.6%', name: 'Wallet' },
                        { percent: '20.6%', name: 'Other' }
                    ]
                },
                counterparty: {
                    received: {
                        amount: '$22334.45',
                        danger: [
                            { percent: '7.8%', name: 'Gambling' }
                        ],
                        dangerTotal: '7.8%',
                        suspicious: [
                            { percent: '2.7%', name: 'P2P Exchange (High Risk)' }
                        ],
                        suspiciousTotal: '2.7%',
                        trusted: [
                            { percent: '52.7%', name: 'Exchange' },
                            { percent: '2.8%', name: 'Wallet' },
                            { percent: '33.8%', name: 'Other' }
                        ],
                        trustedTotal: '89.3%'
                    },
                    sent: {
                        amount: '$22739.09',
                        danger: [
                            { percent: '7.8%', name: 'Gambling' }
                        ],
                        dangerTotal: '7.8%',
                        suspicious: [],
                        suspiciousTotal: '',
                        trusted: [
                            { percent: '84.5%', name: 'Exchange' },
                            { percent: '7.6%', name: 'Wallet' }
                        ],
                        trustedTotal: '92.1%'
                    }
                }
            },
            '0x9112342e080f51029b2f115fb94024feb86497bc': {
                blockchain: 'BNB Chain',
                blockchainIcon: 'BNB',
                risk: '13%',
                riskLabel: 'Low Risk',
                balance: '0.038302 BNB',
                balanceCrypto: '',
                platforms: 'Bybit, Coinex, Binance, BingX, ChangeNow',
                taggedLabels: 'binance, deposit',
                relatedEvents: '',
                relatedInfo: '',
                firstChange: '',
                lastChange: '',
                transactions: '',
                checkCost: '1 ◆',
                timestamp: '10.10.2025 18:28',
                sanctionsStatus: 'red',
                sanctionsText: 'Keep in mind! Some sanction connections are detected',
                connections: {
                    danger: [
                        { percent: '0.4%', name: 'Sanctions' }
                    ],
                    suspicious: [
                        { percent: '5.3%', name: 'Risky Exchange' },
                        { percent: '1.5%', name: 'P2P Exchange (High Risk)' },
                        { percent: '0.2%', name: 'Liquidity Pools' }
                    ],
                    trusted: [
                        { percent: '91.4%', name: 'Exchange' },
                        { percent: '1.1%', name: 'Other' }
                    ]
                },
                counterparty: {
                    received: {
                        amount: '$96399.48',
                        danger: [
                            { percent: '0.8%', name: 'Sanctions' }
                        ],
                        dangerTotal: '0.8%',
                        suspicious: [
                            { percent: '10.6%', name: 'Risky Exchange' },
                            { percent: '3%', name: 'P2P Exchange (High Risk)' },
                            { percent: '0.5%', name: 'Liquidity Pools' }
                        ],
                        suspiciousTotal: '14.1%',
                        trusted: [
                            { percent: '82.7%', name: 'Exchange' },
                            { percent: '2.2%', name: 'Other' }
                        ],
                        trustedTotal: '84.9%'
                    },
                    sent: {
                        amount: '$95370.89',
                        danger: [],
                        dangerTotal: '',
                        suspicious: [],
                        suspiciousTotal: '',
                        trusted: [
                            { percent: '100%', name: 'Exchange' }
                        ],
                        trustedTotal: '100.0%'
                    }
                }
            },
            '0xf2e8e0761df9acda6d6b67a219ce41e522647e26': {
                blockchain: 'BNB Chain',
                blockchainIcon: 'BNB',
                risk: '63%',
                riskLabel: 'Medium Risk',
                balance: '',
                balanceCrypto: '',
                platforms: 'Binance, WhiteBIT, Cobo, chainup_custody, stake.com, Bybit',
                taggedLabels: 'stake.com, deposit',
                relatedEvents: 'Fake_Phishing, Harmony Horizon Bridge Exploiter',
                relatedInfo: 'OKX Web3 Wallet, MetaMask, amilliondollarin.eth',
                firstChange: '',
                lastChange: '',
                transactions: '',
                checkCost: '0 ◆',
                timestamp: '10.10.2025 18:28',
                sanctionsStatus: 'green',
                sanctionsText: 'Not found any sanctions connections',
                connections: {
                    danger: [
                        { percent: '57.7%', name: 'Gambling' }
                    ],
                    suspicious: [],
                    trusted: [
                        { percent: '28.3%', name: 'Exchange' },
                        { percent: '13.8%', name: 'Payment' }
                    ]
                },
                counterparty: {
                    received: {
                        amount: '$83769.55',
                        danger: [
                            { percent: '6.2%', name: 'Gambling' }
                        ],
                        dangerTotal: '6.2%',
                        suspicious: [],
                        suspiciousTotal: '',
                        trusted: [
                            { percent: '62.9%', name: 'Exchange' },
                            { percent: '30.8%', name: 'Payment' }
                        ],
                        trustedTotal: '93.7%'
                    },
                    sent: {
                        amount: '$84435.75',
                        danger: [
                            { percent: '100%', name: 'Gambling' }
                        ],
                        dangerTotal: '100.0%',
                        suspicious: [],
                        suspiciousTotal: '',
                        trusted: [],
                        trustedTotal: ''
                    }
                }
            },
            'TKQFrR25Td1HZTB5ccXSXH3zT62GC14aDz': {
                blockchain: 'Tron',
                blockchainIcon: 'TRX',
                risk: '68%',
                riskLabel: 'Medium Risk',
                balance: "1'232.061715 TRX",
                balanceCrypto: '',
                platforms: 'Binance, MEXC, redotpay.com, triple-a.io, cryptomus.com, Bybit, Kucoin, BingX, yellowcard.io, BTCTurk, Bridgers.xyz Swap',
                taggedLabels: '',
                relatedEvents: '',
                relatedInfo: '',
                firstChange: '',
                lastChange: '',
                transactions: '2578',
                checkCost: '1 ◆',
                timestamp: '10.10.2025 18:20',
                sanctionsStatus: 'red',
                sanctionsText: 'Keep in mind! Some sanction connections are detected',
                connections: {
                    danger: [
                        { percent: '0.6%', name: 'Gambling' },
                        { percent: '30.9%', name: 'Sanctions' }
                    ],
                    suspicious: [
                        { percent: '16.3%', name: 'Risky Exchange' },
                        { percent: '3.4%', name: 'P2P Exchange (High Risk)' }
                    ],
                    trusted: [
                        { percent: '47.5%', name: 'Exchange' },
                        { percent: '1%', name: 'Wallet' }
                    ]
                },
                counterparty: {
                    received: {
                        amount: '$3467811.68',
                        danger: [
                            { percent: '1.4%', name: 'Gambling' },
                            { percent: '63.2%', name: 'Sanctions' }
                        ],
                        dangerTotal: '64.6%',
                        suspicious: [
                            { percent: '17.9%', name: 'Risky Exchange' },
                            { percent: '3.2%', name: 'P2P Exchange (High Risk)' }
                        ],
                        suspiciousTotal: '21.1%',
                        trusted: [
                            { percent: '14.1%', name: 'Exchange' }
                        ],
                        trustedTotal: '14.1%'
                    },
                    sent: {
                        amount: '$3465671.45',
                        danger: [
                            { percent: '1.6%', name: 'Sanctions' }
                        ],
                        dangerTotal: '1.6%',
                        suspicious: [
                            { percent: '14.9%', name: 'Risky Exchange' },
                            { percent: '3.5%', name: 'P2P Exchange (High Risk)' }
                        ],
                        suspiciousTotal: '18.4%',
                        trusted: [
                            { percent: '77.9%', name: 'Exchange' },
                            { percent: '1.9%', name: 'Wallet' }
                        ],
                        trustedTotal: '79.8%'
                    }
                }
            },
            'TF7U883qjRUm6VCTbZEV37W6MBNkWw1CvZ': {
                blockchain: 'Tron',
                blockchainIcon: 'TRX',
                risk: '18%',
                riskLabel: 'Low Risk',
                balance: "11'523.682949 TRX",
                balanceCrypto: '',
                platforms: 'Bybit, Gate, OKX, Binance, Bitso, peppay/paynex?',
                taggedLabels: '',
                relatedEvents: 'Guarantee Merchant',
                relatedInfo: '',
                firstChange: '',
                lastChange: '',
                transactions: '2256',
                checkCost: '1 ◆',
                timestamp: '10.10.2025 18:35',
                sanctionsStatus: 'green',
                sanctionsText: 'Not found any sanctions connections',
                connections: {
                    danger: [
                        { percent: '4.1%', name: 'Illegal Service' }
                    ],
                    suspicious: [
                        { percent: '10.2%', name: 'Risky Exchange' },
                        { percent: '1.5%', name: 'P2P Exchange (High Risk)' }
                    ],
                    trusted: [
                        { percent: '79.6%', name: 'Exchange' },
                        { percent: '4.4%', name: 'Payment' }
                    ]
                },
                counterparty: {
                    received: {
                        amount: '$9648296.54',
                        danger: [
                            { percent: '5.7%', name: 'Illegal Service' }
                        ],
                        dangerTotal: '5.7%',
                        suspicious: [
                            { percent: '12.7%', name: 'Risky Exchange' }
                        ],
                        suspiciousTotal: '12.7%',
                        trusted: [
                            { percent: '81.5%', name: 'Exchange' }
                        ],
                        trustedTotal: '81.5%'
                    },
                    sent: {
                        amount: '$9646451.09',
                        danger: [],
                        dangerTotal: '',
                        suspicious: [
                            { percent: '3.4%', name: 'Risky Exchange' },
                            { percent: '5.7%', name: 'P2P Exchange (High Risk)' }
                        ],
                        suspiciousTotal: '9.1%',
                        trusted: [
                            { percent: '74.7%', name: 'Exchange' },
                            { percent: '16.1%', name: 'Payment' }
                        ],
                        trustedTotal: '90.8%'
                    }
                }
            },
            'TX69wSsy6HxC2NS5JzyM4G8uXZ6B1BVtd2': {
                blockchain: 'Tron',
                blockchainIcon: 'TRX',
                risk: '40%',
                riskLabel: 'Medium Risk',
                balance: "2'210'696.568547 TRX",
                balanceCrypto: '',
                platforms: 'OKX, ccpayment.com, Binance, w8ex, Bybit, maskex, BC.Game, cryptomus.com, yibifu.net, Cobo, Huobi, Indodax, MAX, Remitano, Coinex, byex.com, bitget, stake.com, mixin, BTSE, triple-a.io, Gate, BitoPro, redotpay.com, u.town, pokepay.cc, alphapo.net, goonus.io, BVNK.com, pintu.co.id, otc-u.com, gofun8.com, 1win.com, WangBo Gambling, changehero.io, FixedFloat',
                taggedLabels: '',
                relatedEvents: 'Guarantee Merchant, Poloniex Hacker, BingX exploiter',
                relatedInfo: '',
                firstChange: '',
                lastChange: '',
                transactions: '66453',
                checkCost: '1 ◆',
                timestamp: '10.10.2025 18:20',
                sanctionsStatus: 'green',
                sanctionsText: 'Not found any sanctions connections',
                connections: {
                    danger: [
                        { percent: '18.3%', name: 'Illegal Service' }
                    ],
                    suspicious: [],
                    trusted: [
                        { percent: '81.6%', name: 'Exchange' }
                    ]
                },
                counterparty: {
                    received: {
                        amount: '$414645768.43',
                        danger: [
                            { percent: '33.4%', name: 'Illegal Service' }
                        ],
                        dangerTotal: '33.4%',
                        suspicious: [],
                        suspiciousTotal: '',
                        trusted: [
                            { percent: '66.5%', name: 'Exchange' }
                        ],
                        trustedTotal: '66.5%'
                    },
                    sent: {
                        amount: '$411864941.22',
                        danger: [
                            { percent: '12.2%', name: 'Illegal Service' }
                        ],
                        dangerTotal: '12.2%',
                        suspicious: [],
                        suspiciousTotal: '',
                        trusted: [
                            { percent: '87.7%', name: 'Exchange' }
                        ],
                        trustedTotal: '87.7%'
                    }
                }
            }
        };


        function openDemoModal() {
            console.log('openDemoModal called');
            const modal = document.getElementById('demoModal');
            console.log('Modal element:', modal);
            if (modal) {
                modal.classList.add('active');
                document.getElementById('modalMain').style.display = 'block';
                document.getElementById('modalDetails').style.display = 'none';
                document.body.style.overflow = 'hidden';
                console.log('Demo modal opened successfully');
            } else {
                console.error('Modal element not found!');
            }
        }

        function closeModal() {
            document.getElementById('demoModal').classList.remove('active');
            document.body.style.overflow = 'auto';
        }

        function toggleDropdown() {
            const dropdown = document.getElementById('addressDropdown');
            const input = document.getElementById('addressInput');
            dropdown.classList.toggle('active');
            input.classList.toggle('active');
        }

        function selectAddress(address, chain, color, icon) {
            selectedAddress = address;
            selectedColor = color;
            selectedIcon = icon;
            // Keep placeholder text instead of showing address
            // document.getElementById('addressInput').value = address;
            document.getElementById('addressDropdown').classList.remove('active');
            document.getElementById('addressInput').classList.remove('active');
            
            // Automatically show details after address selection
            setTimeout(() => {
                showDetails();
            }, 300);
        }

        function selectBlockchain(blockchain) {
            const clickedBtn = event.target.closest('.blockchain-btn');
            
            // If the same blockchain is clicked again, deselect it
            if (selectedBlockchain === blockchain && clickedBtn.classList.contains('active')) {
                selectedBlockchain = '';
                clickedBtn.classList.remove('active');
                
                // Show all addresses when no blockchain is selected
                const allItems = document.querySelectorAll('.modal-dropdown-item');
                allItems.forEach(item => {
                    item.style.display = 'flex';
                });
                return;
            }
            
            // Otherwise, select the new blockchain
            selectedBlockchain = blockchain;
            document.querySelectorAll('.blockchain-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            clickedBtn.classList.add('active');
            
            // Filter dropdown addresses by selected blockchain
            const allItems = document.querySelectorAll('.modal-dropdown-item');
            allItems.forEach(item => {
                const chainType = item.querySelector('.modal-dropdown-type').textContent.toLowerCase();
                if (blockchain === 'bitcoin' && chainType === 'bitcoin') {
                    item.style.display = 'flex';
                } else if (blockchain === 'ethereum' && chainType === 'ethereum') {
                    item.style.display = 'flex';
                } else if (blockchain === 'solana' && chainType === 'solana') {
                    item.style.display = 'flex';
                } else if (blockchain === 'bnb' && chainType === 'bnb chain') {
                    item.style.display = 'flex';
                } else if (blockchain === 'tron' && chainType === 'tron') {
                    item.style.display = 'flex';
                } else {
                    item.style.display = 'none';
                }
            });
        }

        function loadAddressData(address) {
            const data = addressData[address];
            if (!data) return;

            // Update blockchain badge with icon
            const blockchainBadge = document.querySelector('.address-chain-badge');
            let iconHTML = '';
            
            // Generate icon based on blockchain
            switch(data.blockchain) {
                case 'Bitcoin':
                    iconHTML = `
                        <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" style="width: 20px; height: 20px;">
                            <g fill="none">
                                <circle cx="16" cy="16" r="16" fill="#F7931A"/>
                                <path fill="#FFF" d="M23.189 14.02c.314-2.096-1.283-3.223-3.465-3.975l.708-2.84-1.728-.43-.69 2.765c-.454-.114-.92-.22-1.385-.326l.695-2.783L15.596 6l-.708 2.839c-.376-.086-.746-.17-1.104-.26l.002-.009-2.384-.595-.46 1.846s1.283.294 1.256.312c.7.175.826.638.805 1.006l-.806 3.235c.048.012.11.03.18.057l-.183-.045-1.13 4.532c-.086.212-.303.531-.793.41.018.025-1.256-.313-1.256-.313l-.858 1.978 2.25.561c.418.105.828.215 1.231.318l-.715 2.872 1.727.43.708-2.84c.472.127.93.245 1.378.357l-.706 2.828 1.728.43.715-2.866c2.948.558 5.164.333 6.097-2.333.752-2.146-.037-3.385-1.588-4.192 1.13-.26 1.98-1.003 2.207-2.538zm-3.95 5.538c-.533 2.147-4.148.986-5.32.695l.95-3.805c1.172.293 4.929.872 4.37 3.11zm.535-5.569c-.487 1.953-3.495.96-4.47.717l.86-3.45c.975.243 4.118.696 3.61 2.733z"/>
                            </g>
                        </svg>`;
                    break;
                case 'Ethereum':
                    iconHTML = `
                        <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" style="width: 20px; height: 20px;">
                            <g fill="none">
                                <circle cx="16" cy="16" r="16" fill="#627EEA"/>
                                <g fill="#FFF">
                                    <path fill-opacity=".602" d="M16.498 4v8.87l7.497 3.35z"/>
                                    <path d="M16.498 4L9 16.22l7.498-3.35z"/>
                                    <path fill-opacity=".602" d="M16.498 21.968v6.027L24 17.616z"/>
                                    <path d="M16.498 27.995v-6.028L9 17.616z"/>
                                    <path fill-opacity=".2" d="M16.498 20.573l7.497-4.353-7.497-3.348z"/>
                                    <path fill-opacity=".602" d="M9 16.22l7.498 4.353v-7.701z"/>
                                </g>
                            </g>
                        </svg>`;
                    break;
                case 'Solana':
                    iconHTML = `<img src="Solana_logo.webp" alt="Solana" style="width: 20px; height: 20px; border-radius: 50%;">`;
                    break;
                case 'BNB Chain':
                    iconHTML = `
                        <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" style="width: 20px; height: 20px;">
                            <g fill="none">
                                <circle cx="16" cy="16" r="16" fill="#F3BA2F"/>
                                <path d="M12.116 14.404L16 10.52l3.886 3.886 2.26-2.26L16 6l-6.144 6.144 2.26 2.26zM6 16l2.26-2.26L10.52 16l-2.26 2.26L6 16zm6.116 1.596L16 21.48l3.886-3.886 2.26 2.259L16 26l-6.144-6.144-.003-.003 2.263-2.257zM21.48 16l2.26-2.26L26 16l-2.26 2.26L21.48 16zm-3.188-.002h.002V16L16 18.294l-2.291-2.29-.004-.004.004-.003.401-.402.195-.195L16 13.706l2.293 2.293z" fill="#FFF"/>
                            </g>
                        </svg>`;
                    break;
                case 'Tron':
                    iconHTML = `<img src="Tron_logo.webp" alt="Tron" style="width: 20px; height: 20px; border-radius: 50%;">`;
                    break;
            }
            
            blockchainBadge.innerHTML = iconHTML + ' ' + data.blockchain;

            // Update risk percentage and label
            document.querySelector('.risk-percentage').innerHTML = `
                <svg width="24" height="24" viewBox="0 0 24 24" fill="#F59E0B">
                    <path d="M13 2L3 14h8l-1 8 10-12h-8l1-8z"/>
                </svg>
                ${data.risk}
            `;
            document.querySelector('.risk-label').textContent = data.riskLabel;
            
            // Update risk label color
            const riskLabel = document.querySelector('.risk-label');
            if (riskLabel) {
                if (data.riskLabel === 'Low Risk') {
                    riskLabel.style.color = '#10B981';
                } else {
                    riskLabel.style.color = '#F59E0B';
                }
            }

            // Update balance
            const balanceAmount = document.querySelector('.balance-amount');
            const balanceCrypto = document.querySelector('.balance-crypto');
            if (balanceAmount) balanceAmount.textContent = data.balance;
            if (balanceCrypto) balanceCrypto.textContent = data.balanceCrypto;

            // Update Additional Address information section
            const additionalSection = document.querySelectorAll('.info-section')[0];
            let additionalHTML = '';
            let hasAdditionalData = false;
            
            if (data.taggedLabels) {
                hasAdditionalData = true;
                additionalHTML += `
                    <div class="info-row">
                        <span class="info-label">Tagged labels:</span>
                        <span class="info-value">${data.taggedLabels}</span>
                    </div>
                `;
            }
            
            if (data.platforms) {
                hasAdditionalData = true;
                additionalHTML += `
                    <div class="info-row" style="display: block;">
                        <span class="info-label" style="display: block; margin-bottom: 0.5rem;">Direct Interactions with platforms:</span>
                        <span class="info-value" style="display: block;">${data.platforms}</span>
                    </div>
                `;
            }
            
            if (data.relatedEvents) {
                hasAdditionalData = true;
                additionalHTML += `
                    <div class="info-row" style="display: block;">
                        <span class="info-label" style="display: block; margin-bottom: 0.5rem;">Related Events:</span>
                        <span class="info-value" style="display: block; color: #EF4444;">${data.relatedEvents}</span>
                    </div>
                `;
            }
            
            if (data.relatedInfo) {
                hasAdditionalData = true;
                additionalHTML += `
                    <div class="info-row">
                        <span class="info-label">Related Information:</span>
                        <span class="info-value">${data.relatedInfo}</span>
                    </div>
                `;
            }
            
            if (hasAdditionalData) {
                additionalSection.innerHTML = '<h4>Additional Address information</h4>' + additionalHTML;
                additionalSection.style.display = 'block';
            } else {
                additionalSection.style.display = 'none';
            }

            // Update general info
            const generalSection = document.querySelectorAll('.info-section')[1];
            let generalHTML = '';
            let hasGeneralData = false;
            
            if (data.firstChange) {
                hasGeneralData = true;
                generalHTML += `
                    <div class="info-row">
                        <span class="info-label">First balance change:</span>
                        <span class="info-value">${data.firstChange}</span>
                    </div>
                `;
            }
            
            if (data.lastChange) {
                hasGeneralData = true;
                generalHTML += `
                    <div class="info-row">
                        <span class="info-label">Last balance change:</span>
                        <span class="info-value">${data.lastChange}</span>
                    </div>
                `;
            }
            
            if (data.transactions) {
                hasGeneralData = true;
                generalHTML += `
                    <div class="info-row">
                        <span class="info-label">Number of transactions:</span>
                        <span class="info-value">${data.transactions}</span>
                    </div>
                `;
            }
            
            if (hasGeneralData) {
                generalSection.innerHTML = '<h4>General info</h4>' + generalHTML;
                generalSection.style.display = 'block';
            } else {
                generalSection.style.display = 'none';
            }

            // Update last check
            const checkRows = document.querySelectorAll('.info-section')[2].querySelectorAll('.info-row');
            checkRows[0].querySelector('.info-value').textContent = data.checkCost;
            checkRows[2].querySelector('.info-value').textContent = data.timestamp;

            // Update sanctions screening
            const sanctionsBox = document.querySelector('.sanctions-box');
            if (sanctionsBox) {
                if (data.sanctionsStatus === 'red') {
                    sanctionsBox.style.background = '#FEE2E2';
                    sanctionsBox.style.borderColor = '#EF4444';
                    const h4 = sanctionsBox.querySelector('h4');
                    const p = sanctionsBox.querySelector('p');
                    const svgPath = sanctionsBox.querySelector('svg path');
                    if (h4) h4.style.color = '#B91C1C';
                    if (p) p.style.color = '#B91C1C';
                    if (svgPath) svgPath.setAttribute('d', 'M12 2L4 5v6.09c0 5.05 3.41 9.76 8 10.91 4.59-1.15 8-5.86 8-10.91V5l-8-3zm1 13h-2v-2h2v2zm0-4h-2V6h2v5z');
                } else {
                    sanctionsBox.style.background = '#ECFDF5';
                    sanctionsBox.style.borderColor = '#10B981';
                    const h4 = sanctionsBox.querySelector('h4');
                    const p = sanctionsBox.querySelector('p');
                    const svgPath = sanctionsBox.querySelector('svg path');
                    if (h4) h4.style.color = '#047857';
                    if (p) p.style.color = '#047857';
                    if (svgPath) svgPath.setAttribute('d', 'M12 2L4 5v6.09c0 5.05 3.41 9.76 8 10.91 4.59-1.15 8-5.86 8-10.91V5l-8-3zm-1 14l-4-4 1.41-1.41L11 13.17l5.59-5.59L18 9l-7 7z');
                }
                const sanctionsText = sanctionsBox.querySelector('p');
                if (sanctionsText && sanctionsText.childNodes[2]) {
                    sanctionsText.childNodes[2].textContent = ' ' + data.sanctionsText;
                }
            }

            // Update address connections
            const addressTab = document.getElementById('addressTab');
            let connectionsHTML = '';

            if (data.connections.danger && data.connections.danger.length > 0) {
                connectionsHTML += `
                    <div class="connection-category">
                        <div class="category-header">
                            <div class="category-icon danger">
<svg width="20" height="20" viewBox="0 0 20 20" fill="none">
<circle cx="10" cy="10" r="10" fill="#EF4444"/>
<path d="M6 10h8" stroke="white" stroke-width="2" stroke-linecap="round"/>
</svg>
</div>
                            <h4 class="category-title">Danger</h4>
                        </div>
                        ${data.connections.danger.map(conn => `
                            <div class="connection-item">
                                <div class="connection-percent danger">${conn.percent}</div>
                                <div class="connection-name">${conn.name}</div>
                            </div>
                        `).join('')}
                    </div>
                `;
            }

            if (data.connections.suspicious && data.connections.suspicious.length > 0) {
                connectionsHTML += `
                    <div class="connection-category">
                        <div class="category-header">
                            <div class="category-icon warning">
<svg width="20" height="20" viewBox="0 0 20 20" fill="none">
<circle cx="10" cy="10" r="10" fill="#F59E0B"/>
<path d="M10 6v5M10 14h.01" stroke="white" stroke-width="2" stroke-linecap="round"/>
</svg>
</div>
                            <h4 class="category-title">Suspicious</h4>
                        </div>
                        ${data.connections.suspicious.map(conn => `
                            <div class="connection-item">
                                <div class="connection-percent warning">${conn.percent}</div>
                                <div class="connection-name">${conn.name}</div>
                            </div>
                        `).join('')}
                    </div>
                `;
            }

            if (data.connections.trusted && data.connections.trusted.length > 0) {
                connectionsHTML += `
                    <div class="connection-category">
                        <div class="category-header">
                            <div class="category-icon success">
<svg width="20" height="20" viewBox="0 0 20 20" fill="none">
<circle cx="10" cy="10" r="10" fill="#10B981"/>
<path d="M6 10l3 3 5-6" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
</div>
                            <h4 class="category-title">Trusted</h4>
                        </div>
                        ${data.connections.trusted.map(conn => `
                            <div class="connection-item">
                                <div class="connection-percent success">${conn.percent}</div>
                                <div class="connection-name">${conn.name}</div>
                            </div>
                        `).join('')}
                    </div>
                `;
            }

            addressTab.innerHTML = connectionsHTML;

            // Update counterparty connections
            const counterpartyTab = document.getElementById('counterpartyTab');
            let counterpartyHTML = '';

            if (data.counterparty) {
                // Received section
                if (data.counterparty.received) {
                    const received = data.counterparty.received;
                    counterpartyHTML += `
                        <div style="margin-bottom: 2rem;">
                            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem;">
                                <h4 style="font-size: 1.25rem; font-weight: 700; margin: 0;">Received</h4>
                                <div style="font-size: 1.125rem; font-weight: 600;">${received.amount}</div>
                            </div>
                    `;

                    if (received.danger && received.danger.length > 0) {
                        counterpartyHTML += `
                            <div class="connection-category">
                                <div class="category-header">
                                    <div class="category-icon danger">
<svg width="20" height="20" viewBox="0 0 20 20" fill="none">
<circle cx="10" cy="10" r="10" fill="#EF4444"/>
<path d="M6 10h8" stroke="white" stroke-width="2" stroke-linecap="round"/>
</svg>
</div>
                                    <h4 class="category-title">Danger</h4>
                                    <span style="margin-left: auto; font-weight: 700; color: #EF4444;">${received.dangerTotal}</span>
                                </div>
                                ${received.danger.map(conn => `
                                    <div class="connection-item">
                                        <div class="connection-percent danger">${conn.percent}</div>
                                        <div class="connection-name">${conn.name}</div>
                                    </div>
                                `).join('')}
                            </div>
                        `;
                    }

                    if (received.suspicious && received.suspicious.length > 0) {
                        counterpartyHTML += `
                            <div class="connection-category">
                                <div class="category-header">
                                    <div class="category-icon warning">
<svg width="20" height="20" viewBox="0 0 20 20" fill="none">
<circle cx="10" cy="10" r="10" fill="#F59E0B"/>
<path d="M10 6v5M10 14h.01" stroke="white" stroke-width="2" stroke-linecap="round"/>
</svg>
</div>
                                    <h4 class="category-title">Suspicious</h4>
                                    <span style="margin-left: auto; font-weight: 700; color: #F59E0B;">${received.suspiciousTotal}</span>
                                </div>
                                ${received.suspicious.map(conn => `
                                    <div class="connection-item">
                                        <div class="connection-percent warning">${conn.percent}</div>
                                        <div class="connection-name">${conn.name}</div>
                                    </div>
                                `).join('')}
                            </div>
                        `;
                    }

                    if (received.trusted && received.trusted.length > 0) {
                        counterpartyHTML += `
                            <div class="connection-category">
                                <div class="category-header">
                                    <div class="category-icon success">
<svg width="20" height="20" viewBox="0 0 20 20" fill="none">
<circle cx="10" cy="10" r="10" fill="#10B981"/>
<path d="M6 10l3 3 5-6" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
</div>
                                    <h4 class="category-title">Trusted</h4>
                                    <span style="margin-left: auto; font-weight: 700; color: #059669;">${received.trustedTotal}</span>
                                </div>
                                ${received.trusted.map(conn => `
                                    <div class="connection-item">
                                        <div class="connection-percent success">${conn.percent}</div>
                                        <div class="connection-name">${conn.name}</div>
                                    </div>
                                `).join('')}
                            </div>
                        `;
                    }

                    counterpartyHTML += `</div>`;
                }

                // Sent section
                if (data.counterparty.sent) {
                    const sent = data.counterparty.sent;
                    counterpartyHTML += `
                        <div>
                            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem;">
                                <h4 style="font-size: 1.25rem; font-weight: 700; margin: 0;">Sent</h4>
                                <div style="font-size: 1.125rem; font-weight: 600;">${sent.amount}</div>
                            </div>
                    `;

                    if (sent.danger && sent.danger.length > 0) {
                        counterpartyHTML += `
                            <div class="connection-category">
                                <div class="category-header">
                                    <div class="category-icon danger">
<svg width="20" height="20" viewBox="0 0 20 20" fill="none">
<circle cx="10" cy="10" r="10" fill="#EF4444"/>
<path d="M6 10h8" stroke="white" stroke-width="2" stroke-linecap="round"/>
</svg>
</div>
                                    <h4 class="category-title">Danger</h4>
                                    <span style="margin-left: auto; font-weight: 700; color: #EF4444;">${sent.dangerTotal}</span>
                                </div>
                                ${sent.danger.map(conn => `
                                    <div class="connection-item">
                                        <div class="connection-percent danger">${conn.percent}</div>
                                        <div class="connection-name">${conn.name}</div>
                                    </div>
                                `).join('')}
                            </div>
                        `;
                    }

                    if (sent.suspicious && sent.suspicious.length > 0) {
                        counterpartyHTML += `
                            <div class="connection-category">
                                <div class="category-header">
                                    <div class="category-icon warning">
<svg width="20" height="20" viewBox="0 0 20 20" fill="none">
<circle cx="10" cy="10" r="10" fill="#F59E0B"/>
<path d="M10 6v5M10 14h.01" stroke="white" stroke-width="2" stroke-linecap="round"/>
</svg>
</div>
                                    <h4 class="category-title">Suspicious</h4>
                                    <span style="margin-left: auto; font-weight: 700; color: #F59E0B;">${sent.suspiciousTotal}</span>
                                </div>
                                ${sent.suspicious.map(conn => `
                                    <div class="connection-item">
                                        <div class="connection-percent warning">${conn.percent}</div>
                                        <div class="connection-name">${conn.name}</div>
                                    </div>
                                `).join('')}
                            </div>
                        `;
                    }

                    if (sent.trusted && sent.trusted.length > 0) {
                        counterpartyHTML += `
                            <div class="connection-category">
                                <div class="category-header">
                                    <div class="category-icon success">
<svg width="20" height="20" viewBox="0 0 20 20" fill="none">
<circle cx="10" cy="10" r="10" fill="#10B981"/>
<path d="M6 10l3 3 5-6" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
</div>
                                    <h4 class="category-title">Trusted</h4>
                                    <span style="margin-left: auto; font-weight: 700; color: #059669;">${sent.trustedTotal}</span>
                                </div>
                                ${sent.trusted.map(conn => `
                                    <div class="connection-item">
                                        <div class="connection-percent success">${conn.percent}</div>
                                        <div class="connection-name">${conn.name}</div>
                                    </div>
                                `).join('')}
                            </div>
                        `;
                    }

                    counterpartyHTML += `</div>`;
                }

                counterpartyTab.innerHTML = counterpartyHTML;
            }
        }

        function showDetails() {
            document.getElementById('modalMain').style.display = 'none';
            document.getElementById('modalDetails').style.display = 'block';
            if (selectedAddress) {
                document.getElementById('detailsAddress').textContent = selectedAddress.substring(0, 8) + '...' + selectedAddress.substring(selectedAddress.length - 5);
                // Load address-specific data
                loadAddressData(selectedAddress);
            }
        }

        function copyAddress() {
            if (selectedAddress) {
                navigator.clipboard.writeText(selectedAddress).then(() => {
                    // Optional: Show a notification that address was copied
                    console.log('Address copied:', selectedAddress);
                }).catch(err => {
                    console.error('Failed to copy:', err);
                });
            }
        }

        function backToMain() {
            document.getElementById('modalDetails').style.display = 'none';
            document.getElementById('modalMain').style.display = 'block';
        }

        function switchTab(tab) {
            document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
            document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
            
            if (tab === 'address') {
                document.querySelectorAll('.tab-btn')[0].classList.add('active');
                document.getElementById('addressTab').classList.add('active');
            } else {
                document.querySelectorAll('.tab-btn')[1].classList.add('active');
                document.getElementById('counterpartyTab').classList.add('active');
            }
        }

        // Add click event listeners
        document.addEventListener('DOMContentLoaded', () => {
            // Close modal on outside click
            document.getElementById('demoModal').addEventListener('click', (e) => {
                if (e.target.id === 'demoModal') {
                    closeModal();
                }
            });
        });

        // Mobile Menu Toggle
        function toggleMobileMenu() {
            const menu = document.getElementById('mobileMenu');
            const btn = document.querySelector('.mobile-menu-btn');
            
            menu.classList.toggle('active');
            btn.classList.toggle('active');
        }

        // Pause animation on touch for mobile
        document.addEventListener('DOMContentLoaded', () => {
            const track = document.querySelector('.clients-track');
            if (track) {
                track.addEventListener('touchstart', () => {
                    track.style.animationPlayState = 'paused';
                });
                track.addEventListener('touchend', () => {
                    track.style.animationPlayState = 'running';
                });
            }
        });