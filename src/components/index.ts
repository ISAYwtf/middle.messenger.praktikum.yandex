import { registerPartials } from '@utils';
import { Badge } from './badge';
import { Link } from './link';
import { ProfileLink } from './profile-link';

export { Button } from './button';
export { Field } from './field';
export { Input } from './input';
export { ProfileLink } from './profile-link';
export { Badge } from './badge';
export { Link } from './link';
export { CloseButton } from './close-button';

registerPartials({ Badge, Link, ProfileLink });
