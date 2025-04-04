/**
 * events keys: event type
 * events values: WeakMap(element, handler)
 */
var events = {};

// events의 모든 이벤트를 등록합니다.
export function setupEventListeners(root) {
  for (const eventType in events) {
    root.addEventListener(eventType, handleGlobalEvents);
  }
}

// TODO: 이벤트 객체에 대하여
export function handleGlobalEvents(e) {
  const eventMap = e.target;
  const eventType = e.type;

  if (events[eventType].has(eventMap)) {
    events[eventType].get(eventMap)(e);
  }
}

// export function setupEventListeners(root) {
//   if (!root) return;
//   Object.keys(events).forEach((eventType) =>
//     root.addEventListener(eventType, (e) => {
//       /** 이벤트가 발생한 요소  */
//       let targetElement = e.target;

//       while (targetElement && targetElement !== root) {
//         const handler = events[eventType].get(targetElement);
//         if (handler) {
//           handler(e);
//           break; // handler 있으면 더 안 올라가도 됨
//         }
//         targetElement = targetElement.parentNode;
//       }
//       /** 이벤트가 발생한 요소에 대해, 전역 events에서 찾은 hadler */
//       // const handler = events[eventType].get(targetElement);
//       // // handler가 존재한다면 실행
//       // handler && handler(e);
//     }),
//   );
// }

// eventManager에 event를 추가합니다.
export function addEvent(element, eventType, handler) {
  if (!element) return;
  if (typeof eventType !== "string" || typeof handler !== "function") return;
  events[eventType] = events[eventType] || new WeakMap();
  events[eventType].set(element, handler);
}

// eventManager의 event를 제거합니다.
export function removeEvent(element, eventType) {
  if (!element) return;
  if (typeof eventType !== "string") return;
  const eventMap = events[eventType];
  eventMap && eventMap.delete(element);
}
