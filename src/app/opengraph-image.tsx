import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Angel Crispin — Software Engineer'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function Image() {
    return new ImageResponse(
        (
            <div
                style={{
                    background: '#1a1a1a',
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    padding: '80px 96px',
                    fontFamily: 'sans-serif',
                }}>
                {/* Top: accent line */}
                <div
                    style={{
                        width: 48,
                        height: 3,
                        background: '#445ade',
                        borderRadius: 2,
                    }}
                />

                {/* Center: name + role */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                    <div
                        style={{
                            fontSize: 88,
                            fontWeight: 700,
                            color: '#ffffff',
                            letterSpacing: '-0.03em',
                            lineHeight: 1,
                        }}>
                        Angel Crispin
                    </div>
                    <div
                        style={{
                            fontSize: 32,
                            fontWeight: 400,
                            color: 'rgba(255,255,255,0.45)',
                            letterSpacing: '0.02em',
                        }}>
                        Software Engineer · Lima, Perú
                    </div>
                </div>

                {/* Bottom: tech tags + url */}
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'flex-end',
                    }}>
                    <div style={{ display: 'flex', gap: 10 }}>
                        {['Next.js', 'TypeScript', 'Python', 'C++', 'Rust'].map((tag) => (
                            <div
                                key={tag}
                                style={{
                                    fontSize: 14,
                                    fontWeight: 600,
                                    color: 'rgba(255,255,255,0.35)',
                                    background: 'rgba(255,255,255,0.07)',
                                    border: '1px solid rgba(255,255,255,0.12)',
                                    borderRadius: 6,
                                    padding: '6px 14px',
                                    letterSpacing: '0.06em',
                                    textTransform: 'uppercase',
                                }}>
                                {tag}
                            </div>
                        ))}
                    </div>
                    <div
                        style={{
                            fontSize: 16,
                            color: 'rgba(255,255,255,0.25)',
                            letterSpacing: '0.04em',
                        }}>
                        angelcrispin.dev
                    </div>
                </div>
            </div>
        ),
        { ...size },
    )
}
