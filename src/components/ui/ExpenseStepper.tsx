import type { StepIconProps } from '@mui/material/StepIcon';
import { styled } from '@mui/material/styles';
import * as React from 'react';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import Check from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import Step from '@mui/material/Step';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
import StepLabel from '@mui/material/StepLabel';
import Stepper from '@mui/material/Stepper';
import type { ExpenseDetailResponse, ExpenseResponse } from '@/interfaces/Expense';
import { ExpenseStatus } from '@/enums/ExpenseStatus';
import { useI18n } from '@/i18n/I18nContext';

// Styled connector for stepper lines
const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 22,
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundColor: "var(--ubs-red)",
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundColor: "var(--ubs-red)",
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 3,
    border: 0,
    backgroundColor: '#eaeaf0',
    borderRadius: 1,
    ...theme.applyStyles('dark', {
      backgroundColor: theme.palette.grey[800],
    }),
  },
}));

// Styled step icon root
const ColorlibStepIconRoot = styled('div')<{
  ownerState: { completed?: boolean; active?: boolean };
}>(({ theme }) => ({
  backgroundColor: 'var(--ubs-steel)',
  zIndex: 1,
  color: 'white',
  width: 50,
  height: 50,
  display: 'flex',
  borderRadius: '50%',
  justifyContent: 'center',
  alignItems: 'center',
  ...theme.applyStyles('dark', {}),
  variants: [
    {
      props: ({ ownerState }) => ownerState.active,
      style: {
        backgroundColor: "var(--ubs-red)",
        boxShadow: '0 4px 10px 0 var(--ubs-steel)',
      },
    },
    {
      props: ({ ownerState }) => ownerState.completed,
      style: {
        backgroundColor: "var(--ubs-red)",
      },
    },
  ],
}));

// Determine which icon to show for each step
function getStepIcon(stepIndex: number, expense: ExpenseResponse | ExpenseDetailResponse): React.ReactElement {
  const isRejectedByManager = expense.status === ExpenseStatus.REJECTED && 
                               expense.managerDecision && 
                               !expense.financeDecision;
  
  const isRejectedByFinance = expense.status === ExpenseStatus.REJECTED && 
                              expense.financeDecision;

  // Step 1: Creation (always check)
  if (stepIndex === 1) {
    return <Check />;
  }

  // Step 2: Manager approval
  if (stepIndex === 2) {
    if (isRejectedByManager) {
      return <ClearIcon />;
    }
    return <AccountBoxIcon />;
  }

  // Step 3: Finance approval
  if (stepIndex === 3) {
    if (isRejectedByManager || isRejectedByFinance) {
      return <ClearIcon />;
    }
    return <AttachMoneyIcon />;
  }

  return <Check />;
}

// Create custom step icon component
function createColorlibStepIcon(expense: ExpenseResponse | ExpenseDetailResponse) {
  return function ColorlibStepIcon(props: StepIconProps) {
    const { active, completed, className, icon } = props;
    const stepIndex = Number(icon);
    const IconComponent = getStepIcon(stepIndex, expense);

    return (
      <ColorlibStepIconRoot
        ownerState={{ active, completed }}
        className={className}
      >
        {IconComponent}
      </ColorlibStepIconRoot>
    );
  };
}

// Determine the current active step based on expense status
function getCurrentStep(expense: ExpenseResponse | ExpenseDetailResponse): number {
  switch (expense.status) {
    case ExpenseStatus.PENDING:
      return 0;
    case ExpenseStatus.APPROVED_BY_MANAGER:
      return 1;
    case ExpenseStatus.APPROVED_BY_FINANCE:
      return 2;
    case ExpenseStatus.REJECTED:
      // Rejected by manager: stop at step 1
      if (expense.managerDecision && !expense.financeDecision) {
        return 1;
      }
      // Rejected by finance: stop at step 2
      return 2;
    default:
      return 0;
  }
}

// Get step labels with formatted dates and translations
function getStepLabels(
  expense: ExpenseResponse | ExpenseDetailResponse,
  t: (key: string) => string,
  formatDate: (date: string | Date, options?: Intl.DateTimeFormatOptions) => string
): string[] {
  const dateType: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'numeric', day: 'numeric' };
  const createdLabel = `${t('expenseStepper.createdOn')} ${formatDate(new Date(expense.createdAt), dateType)}`;

  let managerLabel: string;
  if (expense.status === ExpenseStatus.REJECTED && expense.managerDecision && !expense.financeDecision) {
    managerLabel = `${t('expenseStepper.rejectedOn')} ${formatDate(new Date(expense.managerDecision.decisionDate), dateType)}`;
  } else if (expense.managerDecision) {
    managerLabel = `${t('expenseStepper.approvedOn')} ${formatDate(new Date(expense.managerDecision.decisionDate), dateType)}`;
  } else {
    managerLabel = t('expenseStepper.pendingManagerApproval');
  }

  let financeLabel: string;
  if (expense.status === ExpenseStatus.REJECTED && expense.financeDecision) {
    financeLabel = `${t('expenseStepper.rejectedOn')} ${formatDate(new Date(expense.financeDecision.decisionDate), dateType)}`;
  } else if (expense.financeDecision) {
    financeLabel = `${t('expenseStepper.approvedOn')} ${formatDate(new Date(expense.financeDecision.decisionDate), dateType)}`;
  } else {
    financeLabel = t('expenseStepper.pendingFinanceApproval');
  }

  return [createdLabel, managerLabel, financeLabel];
}

export default function CustomizedSteppers({ 
  expense 
}: { 
  expense: ExpenseResponse | ExpenseDetailResponse 
}) {
  const { t, formatDate } = useI18n();
  const currentStep = getCurrentStep(expense);
  const stepLabels = getStepLabels(expense, t, formatDate);

  return (
    <div>
      <Stepper alternativeLabel activeStep={currentStep} connector={<ColorlibConnector />}>
        {stepLabels.map((label) => (
          <Step key={label}>
            <StepLabel slots={{ stepIcon: createColorlibStepIcon(expense) }}>
              {label}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </div>
  );
}
