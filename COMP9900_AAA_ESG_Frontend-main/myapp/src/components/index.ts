/**
 * This file is used to enable Webpack's tree shaking.
 * Aim to manage all components in one place.
 */
/**
 * Components need to be registered here to enable Webpack's tree shaking.
 */
import Footer from './Footer';
import { Question } from './RightContent';
import { AvatarDropdown, AvatarName } from './RightContent/AvatarDropdown';
import { ReportToolTipTitle} from './ToolTipTitle';
import { ReportCardHeader } from './ReportCardHeader';
import { ModalSeparatorLine } from './ModalSeparator';
import { DemoDecompositionTreeGraph, CreateDecompositionTreeGraph } from './FrameworkGraph';

export { AvatarDropdown, AvatarName, Footer, Question,ReportToolTipTitle,ReportCardHeader, DemoDecompositionTreeGraph, ModalSeparatorLine, CreateDecompositionTreeGraph};
