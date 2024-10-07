import { getStage, setStage } from "../models/stage.model.js";
import { getGameAssets } from "../init/assets.js";

export const moveStageHandler = (userId, payload) => {

    let CurrentStages = getStage(userId);
    if (!CurrentStages.length) {
        return { status: 'fail', message: "No stages found for user"}
    }

    CurrentStages.sort((a, b)=> a.id - b.id);
    const CurrentStage = CurrentStages[CurrentStages.length - 1].id;

    if (CurrentStage.id !== payload.CurrentStages) {
        return { status: 'fail', message: "Current Stage mismatch"}
    }

      // 점수 검증
  const serverTime = Date.now();
  const elapsedTime = (serverTime - currentStage.timestamp) / 1000; // 초 단위로 계산

  // 1초당 1점, 100점이상 다음스테이지 이동, 오차범위 5
  // 클라이언트와 서버 간의 통신 지연시간을 고려해서 오차범위 설정
  // elapsedTime 은 100 이상 105 이하 일 경우만 통과
  if (elapsedTime < 100 || elapsedTime > 105) {
    return { status: 'fail', message: 'Invalid elapsed time' };
  }

    const { stages } = getGameAssets();
    if(!stages.data.some((stage) => stage.id === payload.targetStage)) {
        return { status: 'fail', message: "Target stage not found"}
    }
    
    setStage(userId, payload.targetStage, serverTime);

    return { status: 'success' };
  };