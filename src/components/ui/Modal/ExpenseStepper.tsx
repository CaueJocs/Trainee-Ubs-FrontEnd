import type { StepIconProps } from '@mui/material/StepIcon';
import { styled } from '@mui/material/styles';
import * as React from 'react';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import Check from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import Stack from '@mui/material/Stack';
import Step from '@mui/material/Step';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
import StepLabel from '@mui/material/StepLabel';
import Stepper from '@mui/material/Stepper';
import type { ExpenseResponse } from '@/components/layout/PendingApprovalsTable';

//This function determines coloring for each 'status' of the stepper
const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 22,
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundColor: '#E60100'
        ,
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundColor:
        '#E60100',
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

const ColorlibStepIconRoot = styled('div')<{
  ownerState: { completed?: boolean; active?: boolean };
}>(({ theme }) => ({
  backgroundColor: '#ccc',
  zIndex: 1,
  color: '#fff',
  width: 50,
  height: 50,
  display: 'flex',
  borderRadius: '50%',
  justifyContent: 'center',
  alignItems: 'center',
  ...theme.applyStyles('dark', {
    backgroundColor: theme.palette.grey[700],
  }),
  variants: [
    {
      props: ({ ownerState }) => ownerState.active,
      style: {
        backgroundColor:
          '#E60100',
        boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
      },
    },
    {
      props: ({ ownerState }) => ownerState.completed,
      style: {
        backgroundColor:
          '#E60100',
      },
    },
  ],
}));

 // Function to create a custom Step Icon component based on expense status
function createColorlibStepIcon(expense: ExpenseResponse) {
  return function ColorlibStepIcon(props: StepIconProps) {
    const { active, completed, className, icon } = props;

    const stepIndex = Number(icon);

    let IconComponent: React.ReactElement;

    // If rejected and managerApprovalDate exists: second and third icons are clear
    if (
      expense.status === 'REJECTED' &&
      expense.managerApprovalDate &&
      !expense.financeApprovalDate
    ) {
      if (stepIndex === 2 || stepIndex === 3) {
        IconComponent = <ClearIcon />;
      } else {
        IconComponent = <Check />;
      }
    }
    // Else if rejected and financeApprovalDate exists: only third icon is clear
    else if (
      expense.status === 'REJECTED' &&
      expense.financeApprovalDate
    ) {
      if (stepIndex === 3) {
        IconComponent = <ClearIcon />;
      } else {
        const icons: Record<number, React.ReactElement> = {
          1: <Check />,
          2: <AccountBoxIcon />,
        };
        IconComponent = icons[stepIndex];
      }
    }
    // Normal case: all icons as default
    else {
      const icons: Record<number, React.ReactElement> = {
        1: <Check />,
        2: <AccountBoxIcon />,
        3: <AttachMoneyIcon />,
      };

      IconComponent = icons[stepIndex];
    }

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

// Function to determine the current step based on expense status
function getSteps(expense: ExpenseResponse) {
  switch (expense.status) {
    case 'PENDING':
        return 0;
    case 'APPROVED_BY_MANAGER':
        return 1;
    case 'APPROVED_BY_FINANCE':
        return 2;
    case 'REJECTED':
        if (expense.managerApproval && !expense.financeApproval) {
            return 1;
        }
        return 2;
  }
}

// 'getText' functions determine customized message for each step based on expense status
function getManagerStepText(expense: ExpenseResponse): string {
  if (expense.status === 'REJECTED' && expense.managerApprovalDate && !expense.financeApprovalDate) {
    return `Rejected on ${new Date(
      expense.managerApprovalDate
    ).toLocaleDateString()}`;
  }

  if (expense.managerApprovalDate) {
    return `Approved on ${new Date(
      expense.managerApprovalDate
    ).toLocaleDateString()}`;
  }

  return 'Pending Manager Approval';
}

function getFinanceStepText(expense: ExpenseResponse): string {
  if (expense.status === 'REJECTED' && expense.financeApprovalDate) {
    return `Rejected on ${new Date(
      expense.financeApprovalDate
    ).toLocaleDateString()}`;
  }

  if (expense.financeApprovalDate) {
    return `Approved on ${new Date(
      expense.financeApprovalDate
    ).toLocaleDateString()}`;
  }

  return 'Pending Finance Approval';
}


function getStepText(expense: ExpenseResponse): string[] {
  return [
    `Created on ${new Date(expense.createdAt).toLocaleDateString()}`,

    getManagerStepText(expense),

    getFinanceStepText(expense),
  ];
}

export default function CustomizedSteppers({ expense }: { expense: ExpenseResponse }) {
  const currentStep = getSteps(expense);
  const stepText = getStepText(expense);
  return (
    <Stack sx={{ width: '100%' }} spacing={4}>
      <Stepper alternativeLabel activeStep={currentStep} connector={<ColorlibConnector />}>
        {stepText.map((label) => (
          <Step key={label}>
            <StepLabel StepIconComponent={createColorlibStepIcon(expense)}>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </Stack>
  );
}
