/**
 * 공통 타입 정의
 * @packageDocumentation
 */

/**
 * 인라인 스타일 객체 타입
 * Lit의 styleMap과 호환
 *
 * @example
 * ```typescript
 * <tc-button .sx=${{ padding: '1rem', fontSize: '1.25rem' }}>
 *   Large Button
 * </tc-button>
 * ```
 */
export type SxProps = Record<string, string | number>;

/**
 * 공통 크기 옵션
 */
export type Size = 'sm' | 'md' | 'lg';
export type SizeWithAuto = Size | 'auto';

/**
 * 시맨틱 변형 타입
 */
export type SemanticVariant = 'info' | 'success' | 'warning' | 'error';

/**
 * 버튼 변형 타입
 */
export type ButtonVariant = 'primary' | 'secondary' | 'success';

/**
 * 칩 변형 타입
 */
export type ChipVariant = 'default' | 'success' | 'error' | 'info';
