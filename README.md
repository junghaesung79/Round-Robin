# Round Robin Scheduling Simulation

이 프로젝트는 Round Robin 스케줄링 알고리즘을 시각적으로 시뮬레이션하는 웹 애플리케이션입니다. 사용자는 프로세스의 도착 시간과 서비스 시간을 입력하고, 시뮬레이션을 통해 각 프로세스의 응답 시간을 계산할 수 있습니다.

## 기능

- 프로세스 추가 및 제거
- 랜덤 데이터 생성
- Delta(타임 슬라이스) 값을 설정하여 Round Robin 스케줄링 시뮬레이션 실행
- 각 프로세스의 응답 시간 계산 및 평균 응답 시간 표시

## 설정 및 실행 방법

1. **프로젝트 클론**
    ```bash
    git clone https://github.com/your-repo/round-robin-scheduling-simulation.git
    cd round-robin-scheduling-simulation
    ```

2. **파일 열기**
    - 웹 브라우저에서 `index.html` 파일을 엽니다.

## 사용 방법

1. **프로세스 추가**
    - `+` 버튼을 클릭하여 새로운 프로세스를 추가할 수 있습니다. 각 프로세스는 `Process ID`, `Arrival Time`, `Service Time`을 입력할 수 있습니다.

2. **프로세스 제거**
    - `-` 버튼을 클릭하여 마지막 프로세스를 제거할 수 있습니다.

3. **랜덤 데이터 생성**
    - `Fill Random Data` 버튼을 클릭하여 각 프로세스의 `Arrival Time`과 `Service Time`을 랜덤으로 설정할 수 있습니다.

4. **시뮬레이션 실행**
    - `Delta` 입력 필드에 타임 슬라이스 값을 설정하고 `Start` 버튼을 클릭하여 Round Robin 스케줄링 시뮬레이션을 시작합니다.
    - 시뮬레이션 결과는 타임라인에 각 프로세스의 실행 시간 간격으로 표시됩니다.
    - 각 프로세스의 응답 시간을 계산하여 평균 응답 시간을 화면에 표시합니다.

## 주요 코드 설명

### HTML 구조

- `table`: 프로세스 정보를 입력하는 테이블
- `delta-input`: 타임 슬라이스 값을 입력하는 필드
- `button-container`: 각종 버튼 (`+`, `-`, `Fill Random Data`, `Start`)
- `timeline`: 시뮬레이션 결과를 표시하는 타임라인
- `avg-response-time`: 평균 응답 시간을 표시하는 영역

### JavaScript 로직

- **프로세스 추가 및 제거**: 사용자가 프로세스를 추가하거나 제거할 수 있도록 이벤트 리스너를 설정합니다.
- **데이터 업데이트**: 사용자가 입력 필드를 변경할 때 데이터를 업데이트합니다.
- **랜덤 데이터 생성**: `Fill Random Data` 버튼을 클릭하면 랜덤한 도착 시간과 서비스 시간을 생성합니다.
- **시뮬레이션 실행**: `Start` 버튼을 클릭하면 Round Robin 스케줄링 시뮬레이션을 실행합니다.

### 주요 함수

- `addRow()`: 테이블에 새로운 행을 추가합니다.
- `removeRow()`: 테이블에서 마지막 행을 제거합니다.
- `updateData(event)`: 입력 필드가 변경될 때 데이터를 업데이트합니다.
- `simulateRoundRobin(data, quantum)`: Round Robin 스케줄링 시뮬레이션을 실행하고 결과를 표시합니다.
