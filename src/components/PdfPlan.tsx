import React from 'react';
import { Plane, Star, Clock, Car, Train, Bus, MapPin, Navigation } from 'lucide-react';

// lucide-reactのアイコンをSVGとして定義
const PlaneIcon = () => <Plane size={25} />;
const StarIcon = () => <Star size={25} />;
const ClockIcon = () => <Clock size={25} />;
const CarIcon = () => <Car size={14} />;
const TrainIcon = () => <Train size={14} />;
const BusIcon = () => <Bus size={14} />;
const NavigationIcon = () => <Navigation size={14} />;

const DefaultIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
    </svg>
);

interface PdfPlanProps {
    planData: { id: string; type: string; content: string }[];
    title: string;
    dates: string;
}

const PdfPlan: React.FC<PdfPlanProps> = ({ planData, title, dates }) => {
    const getTransportIcon = (method: string) => {
        const methodLower = method?.toLowerCase() || '';
        if (methodLower.includes('電車') || methodLower.includes('train')) return <TrainIcon />;
        if (methodLower.includes('バス') || methodLower.includes('bus')) return <BusIcon />;
        if (methodLower.includes('車') || methodLower.includes('car')) return <CarIcon />;
        if (methodLower.includes('歩') || methodLower.includes('walk')) return <NavigationIcon />;
        return <DefaultIcon />;
    };

    return (
        <div
            style={{
                padding: '50px 40px',
                fontFamily: 'Arial, sans-serif',
                background: '#2563EB',
                minHeight: '100vh',
                color: '#ffffff',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                boxSizing: 'border-box',
                position: 'relative',
                WebkitPrintColorAdjust: 'exact',
                printColorAdjust: 'exact',
            }}
        >
            {/* 背景の装飾パターン */}
            <div
                style={{
                    position: 'absolute',
                    top: '0',
                    left: '0',
                    right: '0',
                    bottom: '0',
                    backgroundImage: `
            radial-gradient(circle at 20% 20%, rgba(59, 130, 246, 0.3) 0%, transparent 50%),
            radial-gradient(circle at 80% 80%, rgba(96, 165, 250, 0.2) 0%, transparent 50%),
            radial-gradient(circle at 40% 60%, rgba(147, 197, 253, 0.1) 0%, transparent 50%)
          `,
                    pointerEvents: 'none',
                }}
            />

            {/* グリッドパターン */}
            <div
                style={{
                    position: 'absolute',
                    top: '0',
                    left: '0',
                    right: '0',
                    bottom: '0',
                    backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)',
                    backgroundSize: '20px 20px',
                    pointerEvents: 'none',
                }}
            />

            {/* ヘッダー */}
            <div
                style={{
                    textAlign: 'center',
                    marginBottom: '60px',
                    width: '100%',
                    maxWidth: '800px',
                    position: 'relative',
                    zIndex: '10',
                }}
            >
                {/* タイトル装飾 */}
                <div
                    style={{
                        marginBottom: '30px',
                        position: 'relative',
                    }}
                >
                    <div
                        style={{
                            position: 'absolute',
                            top: '0px',
                            left: '50%',
                            transform: 'translateX(-50%)',
                            width: '120px',
                            height: '4px',
                        }}
                    />

                    <h1
                        style={{
                            fontSize: '56px',
                            fontWeight: '800',
                            background: 'transparent',
                            backgroundClip: 'text',
                            WebkitBackgroundClip: 'text',
                            color: 'white',
                            margin: '0 0 20px 0',
                            padding: '0',
                            letterSpacing: '-1px',
                            lineHeight: '1.1',
                            textTransform: 'uppercase',
                            textShadow: '0 0 30px rgba(147, 197, 253, 0.5)',
                            position: 'relative',
                        }}
                    >
                        {title || 'Travel Journey'}
                    </h1>

                    <div
                        style={{
                            position: 'absolute',
                            bottom: '0px',
                            left: '50%',
                            transform: 'translateX(-50%)',
                            width: '80px',
                            height: '3px',
                        }}
                    />
                </div>

                <div
                    style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '15px',
                        background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.15), rgba(255, 255, 255, 0.05))',
                        backdropFilter: 'blur(20px)',
                        WebkitBackdropFilter: 'blur(20px)',
                        padding: '18px 35px',
                        borderRadius: '50px',
                        border: '2px solid rgba(255, 255, 255, 0.2)',
                        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
                        position: 'relative',
                    }}
                >
                    <div
                        style={{
                            position: 'absolute',
                            top: '0',
                            left: '0',
                            right: '0',
                            bottom: '0',
                            background: 'linear-gradient(45deg, rgba(96, 165, 250, 0.1), rgba(147, 197, 253, 0.1))',
                            borderRadius: '48px',
                            zIndex: '-1',
                        }}
                    />
                    <div style={{ color: '#dbeafe' }}>
                        <PlaneIcon />
                    </div>
                    <span
                        style={{
                            fontSize: '20px',
                            color: '#f8fafc',
                            fontWeight: '600',
                            letterSpacing: '0.5px',
                            textShadow: '0 1px 2px rgba(0, 0, 0, 0.1)',
                            lineHeight: '1.2',
                        }}
                    >
                        {dates || 'Travel Period'}
                    </span>
                    <div style={{ color: '#dbeafe' }}>
                        <StarIcon />
                    </div>
                </div>
            </div>

            {/* プランコンテンツ */}
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    width: '100%',
                    maxWidth: '650px',
                    position: 'relative',
                    zIndex: '10',
                }}
            >
                {/* メインタイムライン */}
                <div
                    style={{
                        position: 'absolute',
                        left: '35px',
                        top: '70px',
                        bottom: '50px',
                        width: '4px',
                        background: 'linear-gradient(180deg, #3b82f6 0%, #1d4ed8 30%, #1e40af 70%, #3b82f6 100%)',
                        borderRadius: '2px',
                        boxShadow: '0 0 15px rgba(59, 130, 246, 0.4), inset 0 0 5px rgba(255, 255, 255, 0.2)',
                        zIndex: '1',
                    }}
                />

                {planData.map((item, index) => {
                    if (item.type === 'location') {
                        const [locationContent, time] = item.content.split(';');
                        const stepNumber = Math.floor(index / 2) + 1;

                        return (
                            <div
                                key={item.id}
                                style={{
                                    position: 'relative',
                                    width: '100%',
                                    marginBottom: index === planData.length - 1 ? '30px' : '50px',
                                    boxSizing: 'border-box',
                                    zIndex: '2',
                                }}
                            >
                                {/* タイムライン上のメインポイント (変更後) */}
                                <div
                                    style={{
                                        position: 'absolute',
                                        left: '18px',
                                        top: '28px',
                                        width: '30px',
                                        height: '30px',
                                        background: 'linear-gradient(135deg, #ffffff, #dbeafe)',
                                        border: '3px solid #1d4ed8',
                                        borderRadius: '10px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        color: '#1d4ed8',
                                        boxShadow: '0 5px 20px rgba(59, 130, 246, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.8)',
                                        zIndex: '3',
                                    }}
                                >
                                    <MapPin size={16} /> {/* MapPinIcon を直接使用、または別途 MapPinIcon コンポーネントを作成 */}
                                </div>

                                {/* 場所のメインカード */}
                                <div
                                    style={{
                                        background: '#FFFFFF',
                                        backdropFilter: 'blur(20px)',
                                        WebkitBackdropFilter: 'blur(20px)',
                                        marginLeft: '75px',
                                        padding: '35px 40px',
                                        borderRadius: '20px',
                                        boxShadow: '0 10px 40px rgba(0, 0, 0, 0.2), 0 1px 3px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.8)',
                                        border: '4px solid #1d4ed8',
                                        display: 'flex',
                                        position: 'relative',
                                    }}
                                >
                                    {/* ステップ番号 */}
                                    <div
                                        style={{
                                            position: 'absolute',
                                            top: '0px',
                                            right: '30px',
                                            background: '#1d4ed8',
                                            color: '#ffffff',
                                            padding: '8px 18px',
                                            borderRadius: '0 0 15px 15px',
                                            fontSize: '14px',
                                            fontWeight: '800',
                                            letterSpacing: '1px',
                                            boxShadow: '0 5px 15px rgba(30, 64, 175, 0.4)',
                                            lineHeight: '1.2',
                                            minHeight: '20px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                        }}
                                    >
                                        {stepNumber.toString().padStart(2, '0')}
                                    </div>


                                    <div style={{ paddingTop: '10px' }}>
                                        <h3
                                            style={{
                                                fontSize: '24px',
                                                fontWeight: '700',
                                                marginBottom: '18px',
                                                color: '#1e293b',
                                                lineHeight: '1.3',
                                                paddingRight: '80px',
                                                textShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
                                            }}
                                        >
                                            {locationContent || '場所と内容を入力...'}
                                        </h3>
                                        {time && (
                                            <div
                                                style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: '12px',
                                                    background: 'transparent',
                                                    padding: '12px 20px',
                                                    borderRadius: '15px',
                                                    border: '3px solid #1d4ed8',
                                                    boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.5)',
                                                }}
                                            >
                                                <div style={{ color: '#1d4ed8' }}>
                                                    <ClockIcon />
                                                </div>
                                                <span
                                                    style={{
                                                        fontSize: '16px',
                                                        color: '#1e40af',
                                                        fontWeight: '600',
                                                        lineHeight: '1.3',
                                                    }}
                                                >
                                                    {time}
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    } else {
                        // 移動手段
                        const [method, time] = item.content.split(';');

                        return (
                            <div
                                key={item.id}
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'flex-start',
                                    margin: '20px 0',
                                    marginLeft: '75px',
                                    position: 'relative',
                                    width: 'calc(100% - 75px)',
                                    zIndex: '2',
                                }}
                            >
                                {/* タイムライン上の移動アイコン */}
                                <div
                                    style={{
                                        position: 'absolute',
                                        left: '-55px',
                                        top: '50%',
                                        transform: 'translateY(-50%)',
                                        width: '30px',
                                        height: '30px',
                                        background: 'linear-gradient(135deg, #ffffff, #dbeafe)',
                                        border: '3px solid #1d4ed8',
                                        borderRadius: '10px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        color: '#1d4ed8',
                                        boxShadow: '0 5px 20px rgba(59, 130, 246, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.8)',
                                        zIndex: '3',
                                    }}
                                >
                                    {getTransportIcon(method)}
                                </div>

                                {/* 移動手段のカード */}
                                <div
                                    style={{
                                        background: '#FFFFFF',
                                        backdropFilter: 'blur(15px)',
                                        WebkitBackdropFilter: 'blur(15px)',
                                        border: '2px solid #1d4ed8',
                                        borderRadius: '15px',
                                        padding: '16px 28px',
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        gap: '15px',
                                        minWidth: '250px',
                                        boxShadow: '0 5px 25px rgba(59, 130, 246, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.7)',
                                        position: 'relative',
                                    }}
                                >

                                    <div>
                                        <span
                                            style={{
                                                fontSize: '17px',
                                                fontWeight: '700',
                                                color: '#1e293b',
                                                lineHeight: '1.3',
                                            }}
                                        >
                                            {method || '移動手段'}
                                        </span>
                                        {time && (
                                            <span
                                                style={{
                                                    fontSize: '15px',
                                                    color: '#1d4ed8',
                                                    marginLeft: '12px',
                                                    fontWeight: '600',
                                                    lineHeight: '1.3',
                                                }}
                                            >
                                                • {time}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    }
                })}
            </div>

            {/* フッター */}
            <div
                style={{
                    marginTop: '70px',
                    paddingTop: '50px',
                    width: '100%',
                    textAlign: 'center',
                    position: 'relative',
                    zIndex: '10',
                }}
            >
                <div
                    style={{
                        position: 'absolute',
                        top: '0px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: '150px',
                        height: '2px',
                        background: 'transparent',
                    }}
                />

                <div
                    style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '12px',
                        marginBottom: '20px',
                        background: 'transparent',
                        backdropFilter: 'blur(15px)',
                        WebkitBackdropFilter: 'blur(15px)',
                        padding: '12px 25px',
                    }}
                >
                    <span
                        style={{
                            fontSize: '15px',
                            color: '#f1f5f9',
                            fontWeight: '700',
                            letterSpacing: '2px',
                            textTransform: 'uppercase',
                            lineHeight: '1.2',
                            textShadow: '0 1px 2px rgba(0, 0, 0, 0.1)',
                        }}
                    >
                        Generated by タビフロ
                    </span>
                </div>

                <p
                    style={{
                        fontSize: '14px',
                        color: '#cbd5e1',
                        margin: '0',
                        fontWeight: '500',
                        lineHeight: '1.3',
                        textShadow: '0 1px 2px rgba(0, 0, 0, 0.1)',
                    }}
                >
                    {new Date().toLocaleDateString('ja-JP', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                    })}
                </p>
            </div>
        </div>
    );
};

export default PdfPlan;