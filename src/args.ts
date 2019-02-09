import runModeConfigs, { RUN_MODE_KEYS, IRunModeConfig } from './runModeConfigs';

const ARG1_OPTIONS = RUN_MODE_KEYS;

// Processing Arguments
const ARG1 = process.argv[2];
if (process.argv.length !== 3 || ARG1_OPTIONS.indexOf(ARG1) === -1) {
    console.error("Usage: server.ts [" + ARG1_OPTIONS.join("|") + "]")
    process.exit(1);
}

// Setting run mode based on arguments
export const runModeConfig: IRunModeConfig = runModeConfigs[ARG1];
