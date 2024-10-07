import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

export const animateText = trigger('animateText', [
  state(
    'hide',
    style({
      display: 'none',
      opacity: '0',
    })
  ),
  state(
    'show',
    style({
      display: 'block',
      opacity: '1',
    })
  ),
  transition('hide => show', animate('1s ease-in')),
  transition('show => hide', animate('1s ease-out')),
]);

export const onMainContentChange = trigger('onMainContentChange', [
  state(
    'hide',
    style({
      width: '70px',
    })
  ),
  state(
    'show',
    style({
      //width-show
      width: '250px',
    })
  ),
  transition('hide => show', animate('250ms ease-in')),
  transition('show => hide', animate('250ms ease-in')),
]);

export const slide = trigger('slideVertical', [
  state(
    '*',
    style({
      height: 0,
    })
  ),
  state(
    'show',
    style({
      height: '*',
    })
  ),
  transition('* => *', [animate('400ms cubic-bezier(0.25, 0.8, 0.25, 1)')]),
]);
